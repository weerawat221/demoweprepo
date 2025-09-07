import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts, useLocation, Link } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Prism } from "react-syntax-highlighter";
import vscDarkPlus from "react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus.js";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
const dropdownData = {
  backend: [
    { name: "db.js", path: "/backends/db" },
    { name: "package.json", path: "/backends/package" },
    { name: "server.js", path: "/backends/server" },
    { name: "positionController.js", path: "/backends/positionController" },
    { name: "teacherController.js", path: "/backends/teacherController" },
    { name: "errorHandler.js", path: "/backends/errorHandler" },
    { name: "index.js", path: "/backends/index" },
    { name: "positionRoutes.js", path: "/backends/positionRoutes" },
    { name: "teacherRoutes.js", path: "/backends/teacherRoutes" },
    { name: "default.svg", path: "/backends/svg" }
  ],
  fontend: [
    { name: "Nav.tsx", path: "/fontends/Nav" },
    { name: "home.tsx", path: "/fontends/home" },
    { name: "position.tsx", path: "/fontends/position" },
    { name: "teacher.tsx", path: "/fontends/teacher" },
    { name: "CustomSelect.tsx", path: "/fontends/CustomSelect" },
    { name: "routes.ts", path: "/fontends/routes" }
  ],
  database: [
    { name: "CREATE DATABASE", path: "/database/create-database" },
    { name: "CREATE TABLE", path: "/database/create-table" },
    { name: "INSERT INTO", path: "/database/insert-into" }
  ]
};
const navLinks = [
  { name: "Dashboard", href: "/" },
  { name: "Install", href: "/install" },
  { name: "Backend", dropdownKey: "backend" },
  { name: "Fontend", dropdownKey: "fontend" },
  { name: "Database", dropdownKey: "database" }
];
const HamburgerIcon = () => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M4 6h16M4 12h16m-7 6h7" }) });
const CloseIcon = () => /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-6 w-6", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2, children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6 18L18 6M6 6l12 12" }) });
function Nav() {
  var _a, _b;
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();
  const activePath = location.pathname;
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  let activeParentName;
  for (const key in dropdownData) {
    const items = dropdownData[key];
    if (items.some((item) => item.path === activePath)) {
      activeParentName = (_a = navLinks.find((link) => link.dropdownKey === key)) == null ? void 0 : _a.name;
      break;
    }
  }
  const itemToHighlight = hoveredItem || ((_b = navLinks.find((link) => link.href === activePath)) == null ? void 0 : _b.name) || activeParentName;
  return /* @__PURE__ */ jsxs("header", { className: "fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between h-14 px-4 max-w-screen-xl mx-auto", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center space-x-2.5", children: [
        /* @__PURE__ */ jsx("img", { src: "/rr_logo_dark.svg", alt: "React Router Logo", className: "h-5 w-5" }),
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-white text-sm", children: "Demo React Router Code" })
      ] }),
      /* @__PURE__ */ jsx("nav", { className: "hidden md:block", children: /* @__PURE__ */ jsx("ul", { className: "flex items-center space-x-2", children: navLinks.map((link) => {
        const dropdownItems = link.dropdownKey ? dropdownData[link.dropdownKey] : null;
        const isMainLinkActive = activePath === link.href || activeParentName === link.name;
        return /* @__PURE__ */ jsxs(
          "li",
          {
            className: "relative",
            onMouseEnter: () => setHoveredItem(link.name),
            onMouseLeave: () => setHoveredItem(null),
            children: [
              /* @__PURE__ */ jsx(
                Link,
                {
                  to: link.href || "#",
                  className: `relative z-20 block px-3 py-1.5 text-xs rounded-md transition-colors duration-300
                      ${isMainLinkActive ? "text-white" : "text-gray-300 hover:text-white"}`,
                  children: link.name
                }
              ),
              itemToHighlight === link.name && /* @__PURE__ */ jsx(
                motion.div,
                {
                  layoutId: "active-nav-link-desktop",
                  className: "absolute inset-0 bg-white/10 rounded-md z-10",
                  transition: { type: "spring", stiffness: 350, damping: 30 }
                }
              ),
              /* @__PURE__ */ jsx(AnimatePresence, { children: hoveredItem === link.name && dropdownItems && /* @__PURE__ */ jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: 15, scale: 0.95 },
                  animate: { opacity: 1, y: 0, scale: 1 },
                  exit: { opacity: 0, y: 15, scale: 0.95 },
                  transition: { duration: 0.2, ease: "easeOut" },
                  className: "absolute top-full right-0 mt-2.5 w-max z-30",
                  children: /* @__PURE__ */ jsx("div", { className: "bg-gray-800/90 backdrop-blur-lg rounded-lg shadow-xl p-3", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-1", children: dropdownItems.map((item) => /* @__PURE__ */ jsx(
                    Link,
                    {
                      to: item.path,
                      className: `text-xs font-mono px-3 py-1.5 rounded-md block transition-colors duration-200 text-left
                                  ${activePath === item.path ? "bg-sky-600 text-white" : "text-gray-300 bg-gray-700/50 hover:bg-gray-600/70 hover:text-white"}`,
                      children: item.name
                    },
                    item.name
                  )) }) })
                }
              ) })
            ]
          },
          link.name
        );
      }) }) }),
      /* @__PURE__ */ jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsx(
        motion.button,
        {
          onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen),
          className: "p-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-white/50",
          whileTap: { scale: 0.9 },
          children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: isMobileMenuOpen ? /* @__PURE__ */ jsx(motion.div, { initial: { rotate: -90, opacity: 0 }, animate: { rotate: 0, opacity: 1 }, exit: { rotate: 90, opacity: 0 }, children: /* @__PURE__ */ jsx(CloseIcon, {}) }, "close") : /* @__PURE__ */ jsx(motion.div, { initial: { rotate: 90, opacity: 0 }, animate: { rotate: 0, opacity: 1 }, exit: { rotate: -90, opacity: 0 }, children: /* @__PURE__ */ jsx(HamburgerIcon, {}) }, "hamburger") })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: isMobileMenuOpen && /* @__PURE__ */ jsx(
      motion.div,
      {
        initial: { opacity: 0, y: -20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
        transition: { duration: 0.2 },
        className: "md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-lg border-t border-white/10 shadow-lg",
        children: /* @__PURE__ */ jsx("ul", { className: "p-4 space-y-2", children: navLinks.map((link) => {
          const dropdownItems = link.dropdownKey ? dropdownData[link.dropdownKey] : null;
          const isDropdownOpen = openDropdown === link.dropdownKey;
          if (!dropdownItems) {
            return /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: link.href, className: `block px-4 py-2 rounded-md text-sm ${activePath === link.href ? "bg-sky-600 text-white" : "text-gray-200 hover:bg-white/10"}`, children: link.name }) }, link.name);
          }
          return /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsxs("button", { onClick: () => setOpenDropdown(isDropdownOpen ? null : link.dropdownKey), className: `w-full flex justify-between items-center px-4 py-2 rounded-md text-sm text-left ${activeParentName === link.name ? "bg-white/10 text-white" : "text-gray-200 hover:bg-white/10"}`, children: [
              /* @__PURE__ */ jsx("span", { children: link.name }),
              /* @__PURE__ */ jsx(motion.span, { animate: { rotate: isDropdownOpen ? 180 : 0 }, children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-4 w-4", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) }) })
            ] }),
            /* @__PURE__ */ jsx(AnimatePresence, { children: isDropdownOpen && /* @__PURE__ */ jsx(
              motion.ul,
              {
                initial: { height: 0, opacity: 0 },
                animate: { height: "auto", opacity: 1 },
                exit: { height: 0, opacity: 0 },
                className: "ml-4 mt-2 space-y-1 overflow-hidden",
                children: dropdownItems.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: item.path, className: `block px-4 py-2 rounded-md text-xs font-mono ${activePath === item.path ? "bg-sky-600/80 text-white" : "text-gray-300 hover:bg-white/10"}`, children: item.name }) }, item.path))
              }
            ) })
          ] }, link.name);
        }) })
      }
    ) })
  ] });
}
const Footer = () => {
  return /* @__PURE__ */ jsx("footer", { className: "w-full bg-gray-900 border-t border-white/10 mt-20", children: /* @__PURE__ */ jsx("div", { className: "max-w-screen-xl mx-auto py-6 px-4", children: /* @__PURE__ */ jsx("p", { className: "text-center text-sm text-gray-400", children: "React-Router v7 Demo : By CS, 2568" }) }) });
};
function meta$j({}) {
  return [{
    title: "Dashboard"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const NodeJsIcon = () => /* @__PURE__ */ jsxs("svg", {
  width: "267",
  height: "80",
  viewBox: "0 0 267 80",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  className: "fill-[#333333] w-20 h-20 dark:fill-white index-module__oMcDnW__nodejsLogo",
  "aria-label": "Node.js logo",
  children: [/* @__PURE__ */ jsx("mask", {
    id: "a",
    maskUnits: "userSpaceOnUse",
    x: "0",
    y: "0",
    width: "267",
    height: "80",
    children: /* @__PURE__ */ jsx("path", {
      d: "M267 0H0v79.378h267z",
      fill: "#fff"
    })
  }), /* @__PURE__ */ jsxs("g", {
    mask: "url(#a)",
    children: [/* @__PURE__ */ jsx("path", {
      d: "M234.983 78.755a4 4 0 0 1-1.933-.51l-6.121-3.658c-.921-.51-.46-.695-.184-.787 1.242-.417 1.472-.51 2.761-1.25.138-.093.322-.047.46.046l4.694 2.825c.184.092.414.092.552 0l18.363-10.698c.183-.092.277-.277.277-.509V42.867c0-.232-.094-.417-.277-.51l-18.363-10.65c-.184-.093-.414-.093-.552 0l-18.362 10.65c-.184.093-.276.324-.276.51v21.347c0 .186.092.417.276.51l5.016 2.917c2.715 1.39 4.418-.232 4.418-1.852v-21.07c0-.278.23-.556.553-.556h2.347c.276 0 .552.232.552.556v21.07c0 3.658-1.979 5.788-5.431 5.788-1.058 0-1.886 0-4.234-1.157l-4.832-2.779a3.91 3.91 0 0 1-1.933-3.38V42.912c0-1.39.737-2.686 1.933-3.38l18.363-10.697c1.15-.649 2.715-.649 3.865 0l18.363 10.696a3.91 3.91 0 0 1 1.932 3.381V64.26c0 1.39-.736 2.686-1.932 3.381l-18.363 10.697c-.552.232-1.242.417-1.932.417",
      fill: "#5FA04E"
    }), /* @__PURE__ */ jsx("path", {
      d: "M240.69 64.075c-8.055 0-9.712-3.705-9.712-6.854 0-.277.23-.555.552-.555h2.393c.277 0 .507.185.507.463.368 2.454 1.426 3.658 6.305 3.658 3.866 0 5.523-.88 5.523-2.963 0-1.204-.462-2.084-6.49-2.686-5.016-.51-8.146-1.621-8.146-5.65 0-3.75 3.13-5.974 8.376-5.974 5.892 0 8.791 2.038 9.159 6.484a.76.76 0 0 1-.137.416c-.094.093-.231.186-.371.186h-2.439a.54.54 0 0 1-.505-.417c-.553-2.547-1.98-3.38-5.753-3.38-4.234 0-4.74 1.481-4.74 2.593 0 1.342.598 1.76 6.305 2.5 5.66.741 8.33 1.806 8.33 5.788 0 4.076-3.36 6.391-9.157 6.391m26.51-22.413c0 1.945-1.612 3.566-3.546 3.566a3.556 3.556 0 0 1-3.543-3.566 3.556 3.556 0 0 1 3.543-3.565c1.888 0 3.546 1.574 3.546 3.565m-6.536 0c0 1.667 1.335 3.01 2.944 3.01 1.658 0 2.993-1.39 2.993-3.01 0-1.667-1.335-2.963-2.993-2.963a2.975 2.975 0 0 0-2.944 2.963m1.657-1.991h1.381c.46 0 1.381 0 1.381 1.065 0 .74-.462.88-.739.973.554.046.599.416.645.926.046.324.094.88.185 1.065h-.83c0-.186-.137-1.204-.137-1.25-.045-.232-.137-.325-.413-.325h-.691v1.62h-.782zm.736 1.76h.597c.508 0 .599-.37.599-.556 0-.556-.368-.556-.599-.556h-.642v1.112z",
      fill: "#5FA04E"
    }), /* @__PURE__ */ jsx("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M43.674 41.954c0-.834-.46-1.62-1.197-2.038L23.01 28.572c-.322-.185-.69-.278-1.058-.324h-.184c-.368 0-.736.139-1.059.324l-19.512 11.3A2.38 2.38 0 0 0 0 41.953l.046 30.378c0 .416.23.833.598 1.018.368.232.829.232 1.15 0l11.598-6.668a2.36 2.36 0 0 0 1.197-2.037V50.428c0-.833.46-1.62 1.196-2.037l4.924-2.871a2.2 2.2 0 0 1 1.197-.325c.414 0 .828.093 1.15.325l4.925 2.87a2.36 2.36 0 0 1 1.196 2.038v14.217c0 .833.46 1.62 1.197 2.037l11.505 6.668c.368.232.828.232 1.197 0 .368-.185.598-.602.598-1.018zM137.465.139c-.369-.185-.829-.185-1.151 0-.368.231-.598.602-.598 1.019v30.1a.89.89 0 0 1-.415.74.88.88 0 0 1-.828 0l-4.878-2.825a2.36 2.36 0 0 0-2.347 0L107.735 40.52a2.36 2.36 0 0 0-1.196 2.037V65.2c0 .834.46 1.621 1.196 2.038l19.513 11.345a2.36 2.36 0 0 0 2.347 0l19.513-11.345a2.36 2.36 0 0 0 1.196-2.038V8.752c0-.88-.46-1.667-1.196-2.084zm-1.795 57.606c0 .232-.092.417-.276.51l-6.674 3.89a.68.68 0 0 1-.598 0l-6.673-3.89c-.184-.093-.276-.325-.276-.51v-7.78c0-.231.092-.416.276-.509l6.673-3.89a.68.68 0 0 1 .598 0l6.674 3.89c.184.093.276.324.276.51zm66.728-7.965c.737-.417 1.151-1.204 1.151-2.038v-5.51c0-.834-.46-1.62-1.151-2.037l-19.375-11.3a2.36 2.36 0 0 0-2.347 0l-19.512 11.346a2.36 2.36 0 0 0-1.197 2.037v22.645c0 .833.46 1.62 1.197 2.037l19.374 11.114c.737.416 1.611.416 2.301 0l11.736-6.576c.368-.185.598-.602.598-1.019s-.23-.833-.598-1.018L174.97 58.115c-.368-.231-.598-.602-.598-1.018v-7.085c0-.417.23-.834.598-1.02l6.121-3.518a1.12 1.12 0 0 1 1.196 0l6.121 3.519c.368.231.598.602.598 1.019v5.557c0 .416.23.833.599 1.018.368.232.828.232 1.196 0z"
    }), /* @__PURE__ */ jsx("path", {
      "fill-rule": "evenodd",
      "clip-rule": "evenodd",
      d: "M181.551 48.716a.42.42 0 0 1 .461 0l3.727 2.176c.138.092.23.231.23.417v4.352a.49.49 0 0 1-.23.417l-3.727 2.177a.42.42 0 0 1-.461 0l-3.727-2.177a.49.49 0 0 1-.23-.417V51.31c0-.185.092-.325.23-.417z",
      fill: "#5FA04E"
    }), /* @__PURE__ */ jsx("g", {
      transform: "translate(53.428, 28.628)",
      children: /* @__PURE__ */ jsxs("g", {
        opacity: "1",
        children: [/* @__PURE__ */ jsx("path", {
          fill: "url(#b)",
          d: "M22.873.417a2.36 2.36 0 0 0-2.348 0L1.151 11.669C.414 12.086 0 12.873 0 13.707v22.551c0 .834.46 1.621 1.15 2.038l19.375 11.253a2.36 2.36 0 0 0 2.348 0l19.374-11.253c.737-.417 1.15-1.204 1.15-2.038V13.707c0-.834-.46-1.62-1.15-2.038z"
        }), /* @__PURE__ */ jsx("path", {
          fill: "url(#c)",
          "clip-path": "url(#d)",
          d: "m21.699-1.047 21.506 12.995L21.7 51.073.153 38.055z"
        }), /* @__PURE__ */ jsx("path", {
          fill: "url(#e)",
          "clip-path": "url(#d)",
          d: "M21.699-1.047.153 11.948l21.546 39.125 21.506-13.018z"
        })]
      })
    })]
  }), /* @__PURE__ */ jsxs("defs", {
    children: [/* @__PURE__ */ jsxs("linearGradient", {
      id: "b",
      x1: "30.33",
      y1: "8.56",
      x2: "14.9",
      y2: "44.7",
      gradientUnits: "userSpaceOnUse",
      children: [/* @__PURE__ */ jsx("stop", {
        "stop-color": "#3F8B3D"
      }), /* @__PURE__ */ jsx("stop", {
        offset: "0.64",
        "stop-color": "#3F873F"
      }), /* @__PURE__ */ jsx("stop", {
        offset: "0.93",
        "stop-color": "#3DA92E"
      }), /* @__PURE__ */ jsx("stop", {
        offset: "1",
        "stop-color": "#3DAE2B"
      })]
    }), /* @__PURE__ */ jsxs("linearGradient", {
      id: "c",
      x1: "18.8",
      y1: "26.8",
      x2: "68",
      y2: "0.4",
      gradientUnits: "userSpaceOnUse",
      children: [/* @__PURE__ */ jsx("stop", {
        offset: "0.14",
        "stop-color": "#3F873F"
      }), /* @__PURE__ */ jsx("stop", {
        offset: "0.4",
        "stop-color": "#52A044"
      }), /* @__PURE__ */ jsx("stop", {
        offset: "0.71",
        "stop-color": "#64B749"
      }), /* @__PURE__ */ jsx("stop", {
        offset: "0.91",
        "stop-color": "#6ABF4B"
      })]
    }), /* @__PURE__ */ jsxs("linearGradient", {
      id: "e",
      x1: "0.25",
      y1: "24.5",
      x2: "44",
      y2: "24.5",
      gradientUnits: "userSpaceOnUse",
      children: [/* @__PURE__ */ jsx("stop", {
        offset: "0.09",
        "stop-color": "#6ABF4B"
      }), /* @__PURE__ */ jsx("stop", {
        offset: "0.29",
        "stop-color": "#64B749"
      }), /* @__PURE__ */ jsx("stop", {
        offset: "0.6",
        "stop-color": "#52A044"
      }), /* @__PURE__ */ jsx("stop", {
        offset: "0.86",
        "stop-color": "#3F873F"
      })]
    }), /* @__PURE__ */ jsx("clipPath", {
      id: "d",
      children: /* @__PURE__ */ jsx("path", {
        d: "M22.873.417a2.36 2.36 0 0 0-2.348 0L1.151 11.669C.414 12.086 0 12.873 0 13.707v22.551c0 .834.46 1.621 1.15 2.038l19.375 11.253a2.36 2.36 0 0 0 2.348 0l19.374-11.253c.737-.417 1.15-1.204 1.15-2.038V13.707c0-.834-.46-1.62-1.15-2.038z"
      })
    })]
  })]
});
const ExpressJsIcon = () => /* @__PURE__ */ jsx("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  x: "0px",
  y: "0px",
  width: "100",
  height: "100",
  viewBox: "0 0 50 50",
  className: "w-12 h-12",
  children: /* @__PURE__ */ jsx("path", {
    d: "M49.729 11h-.85c-1.051 0-2.041.49-2.68 1.324l-8.7 11.377-8.7-11.377C28.162 11.49 27.171 11 26.121 11h-.85l10.971 14.346L25.036 40h.85c1.051 0 2.041-.49 2.679-1.324L37.5 26.992l8.935 11.684C47.073 39.51 48.063 40 49.114 40h.85L38.758 25.346 49.729 11zM21.289 34.242c-2.554 3.881-7.582 5.87-12.389 4.116C4.671 36.815 2 32.611 2 28.109L2 27h12v0h11l0-4.134c0-6.505-4.818-12.2-11.295-12.809C6.273 9.358 0 15.21 0 22.5l0 5.573c0 5.371 3.215 10.364 8.269 12.183 6.603 2.376 13.548-1.17 15.896-7.256 0 0 0 0 0 0h-.638C22.616 33 21.789 33.481 21.289 34.242zM2 22.5C2 16.71 6.71 12 12.5 12S23 16.71 23 22.5V25H2V22.5z"
  })
});
const MySQLIcon = () => /* @__PURE__ */ jsxs("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "800px",
  height: "800px",
  viewBox: "-18.458 -22.75 191.151 191.151",
  children: [/* @__PURE__ */ jsx("path", {
    d: "M-18.458 6.58h191.151v132.49H-18.458V6.58z",
    fill: "none"
  }), /* @__PURE__ */ jsx("path", {
    d: "M40.054 113.583h-5.175c-.183-8.735-.687-16.947-1.511-24.642h-.046l-7.879 24.642h-3.94l-7.832-24.642h-.045c-.581 7.388-.947 15.602-1.099 24.642H7.81c.304-10.993 1.068-21.299 2.289-30.919h6.414l7.465 22.719h.046l7.511-22.719h6.137c1.344 11.268 2.138 21.575 2.382 30.919M62.497 90.771c-2.107 11.434-4.887 19.742-8.337 24.928-2.688 3.992-5.633 5.99-8.84 5.99-.855 0-1.91-.258-3.16-.77v-2.757c.611.088 1.328.138 2.152.138 1.498 0 2.702-.412 3.62-1.238 1.098-1.006 1.647-2.137 1.647-3.388 0-.858-.428-2.612-1.282-5.268L42.618 90.77h5.084l4.076 13.19c.916 2.995 1.298 5.086 1.145 6.277 2.229-5.953 3.786-12.444 4.673-19.468h4.901v.002z",
    fill: "#5d87a1"
  }), /* @__PURE__ */ jsx("path", {
    d: "M131.382 113.583h-14.7V82.664h4.945v27.113h9.755v3.806zM112.834 114.33l-5.684-2.805c.504-.414.986-.862 1.42-1.381 2.416-2.838 3.621-7.035 3.621-12.594 0-10.229-4.014-15.346-12.045-15.346-3.938 0-7.01 1.298-9.207 3.895-2.414 2.84-3.619 7.022-3.619 12.551 0 5.435 1.068 9.422 3.205 11.951 1.955 2.291 4.902 3.438 8.843 3.438 1.47 0 2.819-.18 4.048-.543l7.4 4.308 2.018-3.474zm-18.413-6.934c-1.252-2.014-1.878-5.248-1.878-9.707 0-7.785 2.365-11.682 7.1-11.682 2.475 0 4.289.932 5.449 2.792 1.25 2.017 1.879 5.222 1.879 9.619 0 7.849-2.367 11.774-7.099 11.774-2.476.001-4.29-.928-5.451-2.796M85.165 105.013c0 2.622-.962 4.773-2.884 6.458-1.924 1.678-4.504 2.519-7.737 2.519-3.024 0-5.956-.966-8.794-2.888l1.329-2.655c2.442 1.223 4.653 1.831 6.638 1.831 1.863 0 3.319-.413 4.375-1.232 1.055-.822 1.684-1.975 1.684-3.433 0-1.837-1.281-3.407-3.631-4.722-2.167-1.19-6.501-3.678-6.501-3.678-2.349-1.712-3.525-3.55-3.525-6.578 0-2.506.877-4.529 2.632-6.068 1.757-1.545 4.024-2.315 6.803-2.315 2.87 0 5.479.769 7.829 2.291l-1.192 2.656c-2.01-.854-3.994-1.281-5.951-1.281-1.585 0-2.809.381-3.66 1.146-.858.762-1.387 1.737-1.387 2.933 0 1.828 1.308 3.418 3.722 4.759 2.196 1.192 6.638 3.723 6.638 3.723 2.409 1.709 3.612 3.53 3.612 6.534",
    fill: "#f8981d"
  }), /* @__PURE__ */ jsx("path", {
    d: "M137.59 72.308c-2.99-.076-5.305.225-7.248 1.047-.561.224-1.453.224-1.531.933.303.3.338.784.601 1.198.448.747 1.229 1.752 1.942 2.276.783.6 1.569 1.194 2.393 1.717 1.453.899 3.1 1.422 4.516 2.318.825.521 1.645 1.195 2.471 1.756.406.299.666.784 1.193.971v-.114c-.264-.336-.339-.822-.598-1.196l-1.122-1.082c-1.084-1.456-2.431-2.727-3.884-3.771-1.196-.824-3.812-1.944-4.297-3.322l-.076-.076c.822-.077 1.797-.375 2.578-.604 1.271-.335 2.43-.259 3.734-.594.6-.15 1.195-.338 1.797-.523v-.337c-.676-.673-1.158-1.567-1.869-2.203-1.902-1.643-3.998-3.25-6.164-4.595-1.16-.749-2.652-1.231-3.887-1.868-.445-.225-1.195-.336-1.457-.71-.67-.822-1.047-1.904-1.533-2.877-1.08-2.053-2.129-4.331-3.061-6.502-.674-1.456-1.084-2.91-1.906-4.257-3.85-6.35-8.031-10.196-14.457-13.971-1.381-.786-3.024-1.121-4.779-1.533l-2.803-.148c-.598-.262-1.197-.973-1.719-1.309-2.132-1.344-7.621-4.257-9.189-.411-1.01 2.431 1.494 4.821 2.354 6.054.635.856 1.458 1.83 1.902 2.802.263.635.337 1.309.6 1.98.598 1.644 1.157 3.473 1.943 5.007.41.782.857 1.604 1.381 2.312.3.414.822.597.936 1.272-.521.744-.562 1.867-.861 2.801-1.344 4.221-.819 9.45 1.086 12.552.596.934 2.018 2.99 3.92 2.202 1.684-.672 1.311-2.801 1.795-4.668.111-.451.038-.747.262-1.043v.073c.521 1.045 1.047 2.052 1.53 3.1 1.159 1.829 3.177 3.735 4.858 5.002.895.676 1.604 1.832 2.725 2.245V74.1h-.074c-.227-.335-.559-.485-.857-.745-.674-.673-1.42-1.495-1.943-2.241-1.566-2.093-2.952-4.41-4.182-6.801-.602-1.16-1.121-2.428-1.606-3.586-.226-.447-.226-1.121-.601-1.346-.562.821-1.381 1.532-1.791 2.538-.711 1.609-.785 3.588-1.049 5.646l-.147.072c-1.19-.299-1.604-1.53-2.056-2.575-1.119-2.654-1.307-6.914-.336-9.976.26-.783 1.385-3.249.936-3.995-.225-.715-.973-1.122-1.383-1.685-.482-.708-1.01-1.604-1.346-2.39-.896-2.091-1.347-4.408-2.312-6.498-.451-.974-1.234-1.982-1.868-2.879-.712-1.008-1.495-1.718-2.058-2.913-.186-.411-.447-1.083-.148-1.53.073-.3.225-.412.523-.487.484-.409 1.867.111 2.352.336 1.385.56 2.543 1.083 3.699 1.867.523.375 1.084 1.085 1.755 1.272h.786c1.193.26 2.538.072 3.661.41 1.979.636 3.772 1.569 5.38 2.576 4.893 3.103 8.928 7.512 11.652 12.778.447.858.637 1.644 1.045 2.539.787 1.832 1.76 3.7 2.541 5.493.785 1.755 1.533 3.547 2.654 5.005.559.784 2.805 1.195 3.812 1.606.745.335 1.905.633 2.577 1.044 1.271.783 2.537 1.682 3.732 2.543.595.448 2.465 1.382 2.576 2.13M99.484 39.844a5.82 5.82 0 0 0-1.529.188v.075h.072c.301.597.824 1.011 1.197 1.532.301.599.562 1.193.857 1.791l.072-.074c.527-.373.789-.971.789-1.868-.227-.264-.262-.522-.451-.784-.22-.374-.705-.56-1.007-.86",
    fill: "#5d87a1"
  }), /* @__PURE__ */ jsx("path", {
    d: "M141.148 113.578h.774v-3.788h-1.161l-.947 2.585-1.029-2.585h-1.118v3.788h.731v-2.882h.041l1.078 2.882h.557l1.074-2.882v2.882zm-6.235 0h.819v-3.146h1.072v-.643h-3.008v.643h1.115l.002 3.146z",
    fill: "#f8981d"
  })]
});
const ReactRouterIcon = () => /* @__PURE__ */ jsxs("svg", {
  width: "602",
  height: "360",
  viewBox: "0 0 602 360",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  className: "w-12 h-12",
  children: [/* @__PURE__ */ jsx("path", {
    d: "M481.36 180C481.36 196.572 474.638 211.572 463.757 222.42C452.875 233.28 437.845 240 421.24 240C404.635 240 389.605 246.708 378.735 257.568C367.853 268.428 361.12 283.428 361.12 300C361.12 316.572 354.398 331.572 343.517 342.42C332.635 353.28 317.605 360 301 360C284.395 360 269.365 353.28 258.495 342.42C247.613 331.572 240.88 316.572 240.88 300C240.88 283.428 247.613 268.428 258.495 257.568C269.365 246.708 284.395 240 301 240C317.605 240 332.635 233.28 343.517 222.42C354.398 211.572 361.12 196.572 361.12 180C361.12 146.856 334.21 120 301 120C284.395 120 269.365 113.28 258.495 102.42C247.613 91.572 240.88 76.572 240.88 60C240.88 43.428 247.613 28.428 258.495 17.568C269.365 6.708 284.395 0 301 0C334.21 0 361.12 26.856 361.12 60C361.12 76.572 367.853 91.572 378.735 102.42C389.605 113.28 404.635 120 421.24 120C454.45 120 481.36 146.856 481.36 180Z",
    fill: "#F44250"
  }), /* @__PURE__ */ jsx("path", {
    d: "M240.88 180C240.88 146.862 213.963 120 180.76 120C147.557 120 120.64 146.862 120.64 180C120.64 213.137 147.557 240 180.76 240C213.963 240 240.88 213.137 240.88 180Z",
    fill: "white"
  }), /* @__PURE__ */ jsx("path", {
    d: "M120.64 300C120.64 266.863 93.7233 240 60.5199 240C27.3165 240 0.399902 266.863 0.399902 300C0.399902 333.138 27.3165 360 60.5199 360C93.7233 360 120.64 333.138 120.64 300Z",
    fill: "white"
  }), /* @__PURE__ */ jsx("path", {
    d: "M601.6 300C601.6 266.863 574.683 240 541.48 240C508.277 240 481.36 266.863 481.36 300C481.36 333.138 508.277 360 541.48 360C574.683 360 601.6 333.138 601.6 300Z",
    fill: "white"
  })]
});
const FramerMotionIcon = () => /* @__PURE__ */ jsxs("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  x: "0px",
  y: "0px",
  width: "100",
  height: "100",
  viewBox: "0 0 24 24",
  className: "w-12 h-12",
  children: [/* @__PURE__ */ jsx("path", {
    d: "M5.811,1H19c0.552,0,1,0.448,1,1v6c0,0.552-0.448,1-1,1h-7L5.28,2.28C4.808,1.808,5.142,1,5.811,1z",
    opacity: ".35"
  }), /* @__PURE__ */ jsx("path", {
    d: "M5,9h7l6.72,6.72c0.472,0.472,0.138,1.28-0.53,1.28H5c-0.552,0-1-0.448-1-1v-6C4,9.448,4.448,9,5,9z"
  }), /* @__PURE__ */ jsx("path", {
    d: "M4,10v6.006c0,0.637,0.253,1.247,0.703,1.697l6.017,6.017c0.472,0.472,1.28,0.138,1.28-0.53V9H5 C4.448,9,4,9.448,4,10z",
    opacity: ".35"
  })]
});
const TailwindCssIcon = () => /* @__PURE__ */ jsxs("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  x: "0px",
  y: "0px",
  width: "100",
  height: "100",
  viewBox: "0 0 48 48",
  className: "w-12 h-12",
  children: [/* @__PURE__ */ jsxs("linearGradient", {
    id: "iOmQfjoCC4Hw6zVwRjSDha_x7XMNGh2vdqA_gr1",
    x1: "21.861",
    x2: "25.703",
    y1: "8.237",
    y2: "36.552",
    gradientUnits: "userSpaceOnUse",
    children: [/* @__PURE__ */ jsx("stop", {
      offset: "0",
      "stop-color": "#00c1e0"
    }), /* @__PURE__ */ jsx("stop", {
      offset: "1",
      "stop-color": "#009bb8"
    })]
  }), /* @__PURE__ */ jsx("path", {
    fill: "url(#iOmQfjoCC4Hw6zVwRjSDha_x7XMNGh2vdqA_gr1)",
    d: "M24,9.604c-5.589,0-9.347,2.439-11.276,7.318c-0.2,0.505,0.417,0.92,0.816,0.551 c2.035-1.882,4.322-2.505,6.86-1.871c1.826,0.456,3.131,1.781,4.576,3.247C27.328,21.236,30.051,24,36,24 c5.589,0,9.348-2.44,11.276-7.319c0.2-0.505-0.417-0.92-0.816-0.551c-2.035,1.882-4.322,2.506-6.86,1.872 c-1.825-0.456-3.13-1.781-4.575-3.247C32.672,12.367,29.948,9.604,24,9.604L24,9.604z M12,24c-5.589,0-9.348,2.44-11.276,7.319 c-0.2,0.505,0.417,0.92,0.816,0.551c2.035-1.882,4.322-2.506,6.86-1.871c1.825,0.457,3.13,1.781,4.575,3.246 c2.353,2.388,5.077,5.152,11.025,5.152c5.589,0,9.348-2.44,11.276-7.319c0.2-0.505-0.417-0.92-0.816-0.551 c-2.035,1.882-4.322,2.506-6.86,1.871c-1.826-0.456-3.131-1.781-4.576-3.246C20.672,26.764,17.949,24,12,24L12,24z"
  })]
});
const ViteIcon = () => /* @__PURE__ */ jsxs("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  x: "0px",
  y: "0px",
  width: "100",
  height: "100",
  viewBox: "0 0 48 48",
  className: "w-12 h-12",
  children: [/* @__PURE__ */ jsxs("linearGradient", {
    id: "oOTIjsOjTqJdvfy5S4iCZa_dJjTWMogzFzg_gr1",
    x1: "13.315",
    x2: "38.005",
    y1: "514.906",
    y2: "481.377",
    gradientTransform: "matrix(1 0 0 -1 0 514)",
    gradientUnits: "userSpaceOnUse",
    children: [/* @__PURE__ */ jsx("stop", {
      offset: "0",
      "stop-color": "#41d1ff"
    }), /* @__PURE__ */ jsx("stop", {
      offset: "1",
      "stop-color": "#9231be"
    })]
  }), /* @__PURE__ */ jsx("path", {
    fill: "url(#oOTIjsOjTqJdvfy5S4iCZa_dJjTWMogzFzg_gr1)",
    d: "M44.86,9.976L25.023,45.448c-0.41,0.732-1.462,0.737-1.878,0.008L2.915,9.979 C2.462,9.185,3.141,8.223,4.041,8.384l19.859,3.55c0.127,0.023,0.256,0.022,0.383-0.001l19.443-3.544 C44.623,8.225,45.305,9.18,44.86,9.976z"
  }), /* @__PURE__ */ jsxs("linearGradient", {
    id: "oOTIjsOjTqJdvfy5S4iCZb_dJjTWMogzFzg_gr2",
    x1: "25.502",
    x2: "37.131",
    y1: "508.764",
    y2: "428.99",
    gradientTransform: "matrix(1 0 0 -1 0 514)",
    gradientUnits: "userSpaceOnUse",
    children: [/* @__PURE__ */ jsx("stop", {
      offset: "0",
      "stop-color": "#fed100"
    }), /* @__PURE__ */ jsx("stop", {
      offset: "1",
      "stop-color": "#e36001"
    })]
  }), /* @__PURE__ */ jsx("path", {
    fill: "url(#oOTIjsOjTqJdvfy5S4iCZb_dJjTWMogzFzg_gr2)",
    d: "M33.574,3.01L19.019,5.862c-0.239,0.047-0.416,0.25-0.431,0.493l-0.895,15.121 c-0.021,0.356,0.306,0.633,0.654,0.552l4.052-0.935c0.379-0.087,0.722,0.246,0.644,0.628l-1.204,5.895 c-0.081,0.397,0.291,0.736,0.679,0.618l2.503-0.76c0.388-0.118,0.761,0.222,0.679,0.62l-1.913,9.26 c-0.12,0.579,0.651,0.895,0.972,0.398l0.215-0.332l11.86-23.669c0.199-0.396-0.144-0.848-0.579-0.764l-4.171,0.805 c-0.392,0.076-0.725-0.289-0.615-0.673l2.722-9.438C34.301,3.299,33.967,2.933,33.574,3.01z"
  })]
});
const frameworks = [{
  name: "Node.js",
  description: "แพลตฟอร์ม JavaScript สำหรับการพัฒนาฝั่งเซิร์ฟเวอร์",
  icon: /* @__PURE__ */ jsx(NodeJsIcon, {}),
  link: "https://nodejs.org/en"
}, {
  name: "Express.js",
  description: "เว็บ Framework สำหรับ Node.js ที่มีประสิทธิภาพและยืดหยุ่น",
  icon: /* @__PURE__ */ jsx(ExpressJsIcon, {}),
  link: "https://expressjs.com/"
}, {
  name: "MySQL",
  description: "ระบบจัดการฐานข้อมูลเชิงสัมพันธ์ยอดนิยม",
  icon: /* @__PURE__ */ jsx(MySQLIcon, {}),
  link: "https://www.mysql.com/"
}, {
  name: "React-Router v7",
  description: "ไลบรารีสำหรับการจัดการการนำทางในแอปพลิเคชัน React",
  icon: /* @__PURE__ */ jsx(ReactRouterIcon, {}),
  link: "https://reactrouter.com/"
}, {
  name: "Framer-Motion",
  description: "ไลบรารีแอนิเมชันสำหรับ React ที่ใช้งานง่าย",
  icon: /* @__PURE__ */ jsx(FramerMotionIcon, {}),
  link: "https://www.framer.com/motion/"
}, {
  name: "Tailwind CSS",
  description: "CSS Framework แบบ Utility-First สำหรับการสร้าง UI ที่รวดเร็ว",
  icon: /* @__PURE__ */ jsx(TailwindCssIcon, {}),
  link: "https://tailwindcss.com/"
}, {
  name: "Vite",
  description: "เครื่องมือสำหรับสร้างโปรเจกต์และ Bundler ที่รวดเร็ว",
  icon: /* @__PURE__ */ jsx(ViteIcon, {}),
  link: "https://vitejs.dev/"
}];
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0
  }
};
const home = UNSAFE_withComponentProps(function Dashboard() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-900 text-white p-8 font-sans",
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsxs("div", {
      className: "container mx-auto max-w-6xl",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-4xl md:text-5xl font-extrabold text-center mt-20 mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text",
        children: "ภาพรวม Framework"
      }), /* @__PURE__ */ jsx("p", {
        className: "text-center text-gray-400 mb-16 text-lg",
        children: "ภาพรวมของเทคโนโลยีและเครื่องมือต่างๆ ที่ใช้ในโปรเจกต์"
      }), /* @__PURE__ */ jsx(motion.div, {
        className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8",
        variants: {
          visible: {
            transition: {
              staggerChildren: 0.07
            }
          }
        },
        initial: "hidden",
        animate: "visible",
        children: frameworks.map((fw, index) => /* @__PURE__ */ jsx(motion.a, {
          href: fw.link,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "block",
          variants: cardVariants,
          whileHover: {
            scale: 1.05,
            y: -5
          },
          whileTap: {
            scale: 0.95
          },
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 15
          },
          children: /* @__PURE__ */ jsxs("div", {
            className: "h-full flex flex-col items-center bg-gray-800/50 p-6 rounded-2xl shadow-lg hover:bg-gray-800 transition-colors duration-300 border border-gray-700/80",
            children: [/* @__PURE__ */ jsx("div", {
              className: "mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-700/50 border border-slate-600 mb-6",
              children: fw.icon
            }), /* @__PURE__ */ jsx("h2", {
              className: "text-xl font-bold text-white mb-2 text-center",
              children: fw.name
            }), /* @__PURE__ */ jsx("p", {
              className: "text-sm text-gray-400 text-center",
              children: fw.description
            })]
          })
        }, index))
      }), /* @__PURE__ */ jsx(Footer, {})]
    })]
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta: meta$j
}, Symbol.toStringTag, { value: "Module" }));
const CopyIcon = () => /* @__PURE__ */ jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
  /* @__PURE__ */ jsx("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }),
  /* @__PURE__ */ jsx("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" })
] });
const CheckIcon = () => /* @__PURE__ */ jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" }) });
const CodeBlock = ({ code, language }) => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    if (isCopied) return;
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }).catch((err) => console.error("Failed to copy text: ", err));
  };
  return (
    // ✨ 2. Animate ตัว Component ทั้งหมดเมื่อปรากฏขึ้น
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        className: "bg-slate-900 rounded-xl my-4 overflow-hidden shadow-2xl border border-slate-700/50",
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center px-4 py-2 bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700/50", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-sans text-slate-400 uppercase tracking-wider", children: language || "Code" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsx(AnimatePresence, { children: isCopied && /* @__PURE__ */ jsx(
                motion.span,
                {
                  className: "text-sm text-green-400",
                  initial: { opacity: 0, y: 5 },
                  animate: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -5 },
                  transition: { duration: 0.2 },
                  children: "Copied!"
                },
                "copied-text"
              ) }),
              /* @__PURE__ */ jsx(
                motion.button,
                {
                  onClick: handleCopy,
                  className: `relative flex items-center justify-center p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500/50 ${isCopied ? "bg-green-600/20 text-green-400" : "bg-slate-700/50 hover:bg-slate-600/50 text-slate-400 hover:text-slate-200"}`,
                  "aria-label": "Copy code",
                  whileHover: { scale: 1.05 },
                  whileTap: { scale: 0.95 },
                  children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: isCopied ? /* @__PURE__ */ jsx(
                    motion.span,
                    {
                      initial: { scale: 0, rotate: -90 },
                      animate: { scale: 1, rotate: 0 },
                      exit: { scale: 0, rotate: 90 },
                      transition: { duration: 0.2, ease: "easeInOut" },
                      children: /* @__PURE__ */ jsx(CheckIcon, {})
                    },
                    "check"
                  ) : /* @__PURE__ */ jsx(
                    motion.span,
                    {
                      initial: { scale: 0, rotate: -90 },
                      animate: { scale: 1, rotate: 0 },
                      exit: { scale: 0, rotate: 90 },
                      transition: { duration: 0.2, ease: "easeInOut" },
                      children: /* @__PURE__ */ jsx(CopyIcon, {})
                    },
                    "copy"
                  ) })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-sm font-mono overflow-x-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent", children: /* @__PURE__ */ jsx(
            Prism,
            {
              language: language || "plaintext",
              style: vscDarkPlus,
              customStyle: {
                margin: 0,
                padding: "1.25rem",
                backgroundColor: "transparent"
              },
              wrapLongLines: true,
              children: code.trim()
            }
          ) })
        ]
      }
    )
  );
};
const installSteps = [{
  name: "Step 1: สร้างโครงสร้าง Server",
  description: "เริ่มต้นด้วยการสร้างไฟล์ package.json เพื่อจัดการ Dependencies ของโปรเจกต์",
  code: `npm init -y`
}, {
  name: "Step 2: ติดตั้ง Dependencies",
  description: "ติดตั้งไลบรารีที่จำเป็นสำหรับ Express.js backend และ nodemon สำหรับการรีสตาร์ทเซิร์ฟเวอร์อัตโนมัติ",
  code: `npm install express cors mysql2 multer morgan dotenv
npm install --save-dev nodemon`
}, {
  name: "สำหรับการติดตั้ง React-Router v7",
  description: "มี 2 แบบสำหรับการติดตั้ง React-Router v7",
  options: [{
    type: "แบบที่ 1: ติดตั้งผ่าน Vite",
    code: `npm create vite@latest`,
    link: "https://vitejs.dev/guide/",
    note: "รายละเอียดเพิ่มเติม"
  }, {
    type: "แบบที่ 2: ติดตั้งผ่าน React-Router",
    code: `npx create-react-router@latest`,
    link: "https://reactrouter.com/start/framework/installation",
    note: "รายละเอียดเพิ่มเติม"
  }],
  note: "หมายเหตุ: การติดตั้งผ่าน Framework ทั้ง 2 แบบนี้มีการติดตั้ง Tailwind CSS มาให้เลย"
}, {
  name: "สำหรับการติดตั้ง Tailwind CSS",
  description: "หากไม่ได้ติดตั้งผ่าน Framework ในขั้นตอนก่อนหน้า คุณสามารถติดตั้ง Tailwind CSS แยกได้",
  code: `npm install tailwindcss @tailwindcss/vite`,
  link: "https://tailwindcss.com/docs/installation/framework-guides/react"
}, {
  name: "สำหรับการติดตั้ง Framer-Motion",
  description: "ติดตั้ง Framer-Motion สำหรับการสร้างแอนิเมชันที่สวยงามและใช้งานง่าย",
  code: `npm install framer-motion`,
  link: "https://www.framer.com/motion/tutorials/getting-started/"
}];
const install = UNSAFE_withComponentProps(function InstallPage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-900 text-white p-8 font-sans",
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsxs("div", {
      className: "container mx-auto max-w-4xl pt-20",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text",
        children: "คำแนะนำการติดตั้ง"
      }), /* @__PURE__ */ jsx("p", {
        className: "text-center text-gray-400 mb-10 text-lg",
        children: "ขั้นตอนและคำสั่งที่จำเป็นสำหรับการติดตั้งเครื่องมือและไลบรารีต่างๆ ในโปรเจกต์"
      }), /* @__PURE__ */ jsx("div", {
        className: "grid gap-8",
        children: installSteps.map((step, index) => /* @__PURE__ */ jsxs(motion.div, {
          className: "p-6 rounded-xl border-t-4 border-b-4 border-purple-500",
          initial: {
            opacity: 0,
            y: 20
          },
          animate: {
            opacity: 1,
            y: 0
          },
          transition: {
            delay: index * 0.1,
            duration: 0.5
          },
          children: [/* @__PURE__ */ jsx("h2", {
            className: "text-2xl font-bold mb-4 text-white",
            children: step.name
          }), /* @__PURE__ */ jsx("p", {
            className: "text-gray-400 mb-4",
            children: step.description
          }), step.options ? /* @__PURE__ */ jsxs("div", {
            className: "space-y-4",
            children: [step.options.map((option, idx) => /* @__PURE__ */ jsxs("div", {
              className: "bg-gray-800 p-4 rounded-lg",
              children: [/* @__PURE__ */ jsx("p", {
                className: "text-sm text-gray-300 font-bold mb-2",
                children: option.type
              }), /* @__PURE__ */ jsx(CodeBlock, {
                code: option.code,
                language: "cmd"
              }), /* @__PURE__ */ jsx("div", {
                className: "mt-2 text-right",
                children: /* @__PURE__ */ jsx("a", {
                  href: option.link,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "text-sky-400 hover:underline text-sm font-light",
                  children: option.note
                })
              })]
            }, idx)), step.note && /* @__PURE__ */ jsx("p", {
              className: "text-yellow-400 font-medium text-sm mt-4",
              children: step.note
            })]
          }) : /* @__PURE__ */ jsxs(Fragment, {
            children: [/* @__PURE__ */ jsx(CodeBlock, {
              code: step.code,
              language: "cmd"
            }), step.link && /* @__PURE__ */ jsx("div", {
              className: "mt-4 text-right",
              children: /* @__PURE__ */ jsx("a", {
                href: step.link,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-sky-400 hover:underline text-sm font-light",
                children: "รายละเอียดเพิ่มเติม"
              })
            })]
          })]
        }, index))
      })]
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: install
}, Symbol.toStringTag, { value: "Module" }));
function meta$i({}) {
  return [{
    title: "Database"
  }, {
    name: "description",
    content: "Database connection example."
  }];
}
const dbCode = `import mysql from 'mysql2/promise';

// Connection Pool
const pool = mysql.createPool({
    host: 'localhost',
    port: '', // xampp port
    user: 'root',
    password: '',
    database: '', // database name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;`;
const sDb = UNSAFE_withComponentProps(function DatabasePage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-900 text-white p-8 font-sans",
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsxs("div", {
      className: "container mx-auto max-w-4xl pt-20",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text",
        children: "การเชื่อมต่อฐานข้อมูล"
      }), /* @__PURE__ */ jsx("p", {
        className: "text-center text-gray-400 mb-10 text-lg",
        children: "ตัวอย่างโค้ดสำหรับสร้าง Connection Pool ไปยังฐานข้อมูล MySQL ด้วย Node.js และไลบรารี mysql2"
      }), /* @__PURE__ */ jsxs(motion.div, {
        className: "p-6 rounded-xl border-t-4 border-b-4 border-purple-500",
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5
        },
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold mb-4 text-white",
          children: "db.js (หรือ db.ts)"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-gray-400 mb-4",
          children: "ไฟล์นี้จะทำหน้าที่เป็นโมดูลสำหรับจัดการการเชื่อมต่อฐานข้อมูล เพื่อให้สามารถเรียกใช้งานได้จากส่วนอื่น ๆ ของแอปพลิเคชันได้อย่างสะดวก"
        }), /* @__PURE__ */ jsx(CodeBlock, {
          code: dbCode,
          language: "javascript"
        })]
      }), /* @__PURE__ */ jsx(Footer, {})]
    })]
  });
});
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sDb,
  meta: meta$i
}, Symbol.toStringTag, { value: "Module" }));
function meta$h({}) {
  return [{
    title: "package.json"
  }, {
    name: "description",
    content: "Node.js project configuration file."
  }];
}
const packageJsonCode = `{
  "name": "school-api",
  "version": "1.0.0",
  "description": "Backend API",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "helmet": "^7.0.0",
    "mysql2": "^3.5.2",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1",
    "compression": "^1.7.4"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}`;
const sPackage = UNSAFE_withComponentProps(function PackageJsonPage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-900 text-white p-8 font-sans",
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsxs("div", {
      className: "container mx-auto max-w-4xl pt-20",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text",
        children: "การตั้งค่า Package.json"
      }), /* @__PURE__ */ jsxs("p", {
        className: "text-center text-gray-400 mb-10 text-lg",
        children: ["ไฟล์", " ", /* @__PURE__ */ jsx("code", {
          className: "text-sm font-mono text-pink-400",
          children: "package.json"
        }), " ", "คือหัวใจของโปรเจกต์ Node.js ที่ใช้จัดการข้อมูลเมตา, สคริปต์, และไลบรารีที่จำเป็น"]
      }), /* @__PURE__ */ jsxs(motion.div, {
        className: "p-6 rounded-xl border-t-4 border-b-4 border-purple-500",
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5
        },
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold mb-4 text-white",
          children: "โครงสร้าง Package.json"
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-gray-400 mb-4",
          children: ["ไฟล์นี้จะระบุ", " ", /* @__PURE__ */ jsx("code", {
            className: "text-sm font-mono text-yellow-300",
            children: "dependencies"
          }), " ", "ที่โปรเจกต์ต้องการและ", " ", /* @__PURE__ */ jsx("code", {
            className: "text-sm font-mono text-yellow-300",
            children: "scripts"
          }), " ", "ที่ใช้ในการรันโปรเจกต์ในโหมดต่างๆ"]
        }), /* @__PURE__ */ jsx(CodeBlock, {
          code: packageJsonCode,
          language: "json"
        })]
      }), /* @__PURE__ */ jsx(Footer, {})]
    })]
  });
});
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sPackage,
  meta: meta$h
}, Symbol.toStringTag, { value: "Module" }));
function meta$g({}) {
  return [{
    title: "Server Main File"
  }, {
    name: "description",
    content: "Main Express server setup file."
  }];
}
const serverCode = `// server.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';
import dotenv from 'dotenv';
import router from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import multer from 'multer';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------- Multer Configuration for File Uploads ----------
// ตั้งค่า Multer เพื่อกำหนดที่เก็บไฟล์ในโฟลเดอร์ 'uploads' ของ Backend
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'uploads');
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

export const upload = multer({ storage: storage });

// ---------- Middleware ----------
app.use(cors({
    origin: '*',
    credentials: true
}));

app.use(helmet({
    crossOriginResourcePolicy: false,
}));
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));

// ---------- Static Files ----------
// Middleware นี้จะทำให้สามารถเรียกดูไฟล์ในโฟลเดอร์ 'uploads' ได้ผ่าน URL /uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ---------- Routes ----------
app.use('/', router);

// ... (ส่วนอื่นๆ ของโค้ดเดิม)
// ---------- Health Check ----------
app.get('/health', (req, res) => {
    res.json({ status: 'OK', env: NODE_ENV, time: new Date().toISOString() });
});

// ---------- 404 Handler ----------
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: \`Not Found - \${req.originalUrl}\`
    });
});

// ---------- Error Handler ----------
app.use(errorHandler);

// ---------- Start Server ----------
app.listen(PORT, () => {
    const url = \`http://localhost:\${PORT}\`;
    console.log(\`\\n✅ Server running in \${NODE_ENV} mode\`);
    console.log(\`🌐 Health check: \${url}/health\`);
    console.log(\`💻 Positions: \${url}/positions\`);
    console.log(\`💻 Teachers: \${url}/teachers\\n\`);
});
`;
const sServer = UNSAFE_withComponentProps(function ServerPage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-900 text-white p-8 font-sans",
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsxs("div", {
      className: "container mx-auto max-w-4xl pt-20",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text",
        children: "การตั้งค่า Server หลัก"
      }), /* @__PURE__ */ jsxs("p", {
        className: "text-center text-gray-400 mb-10 text-lg",
        children: ["ไฟล์", " ", /* @__PURE__ */ jsx("code", {
          className: "text-sm font-mono text-pink-400",
          children: "server.js"
        }), " ", "คือไฟล์หลักที่ใช้ในการรันและตั้งค่า Express.js Server"]
      }), /* @__PURE__ */ jsxs(motion.div, {
        className: "p-6 rounded-xl border-t-4 border-b-4 border-purple-500",
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5
        },
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold mb-4 text-white",
          children: "โครงสร้างและ Middleware"
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-gray-400 mb-4",
          children: ["โค้ดนี้แสดงการนำเข้าและใช้งานไลบรารีต่างๆ เช่น", " ", /* @__PURE__ */ jsx("code", {
            className: "text-sm font-mono text-yellow-300",
            children: "express"
          }), ",", " ", /* @__PURE__ */ jsx("code", {
            className: "text-sm font-mono text-yellow-300",
            children: "cors"
          }), ",", " ", /* @__PURE__ */ jsx("code", {
            className: "text-sm font-mono text-yellow-300",
            children: "morgan"
          }), ", และอื่นๆ"]
        }), /* @__PURE__ */ jsx(CodeBlock, {
          code: serverCode,
          language: "javascript"
        })]
      }), /* @__PURE__ */ jsx(Footer, {})]
    })]
  });
});
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sServer,
  meta: meta$g
}, Symbol.toStringTag, { value: "Module" }));
function meta$f({}) {
  return [{
    title: "Position Controller"
  }, {
    name: "description",
    content: "CRUD operations for the positions table."
  }];
}
const positionControllerCode = `import pool from '../db.js';

// GET all positions
export const getPositions = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM positions');
        res.json({ success: true, data: rows });
    } catch (err) {
        next(err);
    }
};

// CREATE
export const createPosition = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name) throw { status: 400, message: 'Name is required' };

        const [result] = await pool.query(
            'INSERT INTO positions (name) VALUES (?)',
            [name]
        );
        res.json({ success: true, id: result.insertId });
    } catch (err) {
        next(err);
    }
};

// UPDATE
export const updatePosition = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (!name) throw { status: 400, message: 'Name is required' };

        await pool.query('UPDATE positions SET name=? WHERE id=?', [name, id]);
        res.json({ success: true, message: 'Updated successfully' });
    } catch (err) {
        next(err);
    }
};

// DELETE
export const deletePosition = async (req, res, next) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM positions WHERE id=?', [id]);
        res.json({ success: true, message: 'Deleted successfully' });
    } catch (err) {
        next(err);
    }
};`;
const sPositionController = UNSAFE_withComponentProps(function PositionControllerPage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-900 text-white p-8 font-sans",
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsxs("div", {
      className: "container mx-auto max-w-4xl pt-20",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text",
        children: "Position Controller"
      }), /* @__PURE__ */ jsxs("p", {
        className: "text-center text-gray-400 mb-10 text-lg",
        children: ["ตัวอย่างโค้ดสำหรับสร้าง", " ", /* @__PURE__ */ jsx("code", {
          className: "text-sm font-mono text-pink-400",
          children: "Controller"
        }), " ใน Express.js เพื่อจัดการการเพิ่ม, ลบ, แก้ไข และดึงข้อมูลจากตาราง", " ", /* @__PURE__ */ jsx("code", {
          className: "text-sm font-mono text-yellow-300",
          children: "positions"
        })]
      }), /* @__PURE__ */ jsxs(motion.div, {
        className: "p-6 rounded-xl border-t-4 border-b-4 border-purple-500",
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5
        },
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold mb-4 text-white",
          children: "positions.js (หรือ positions.ts)"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-gray-400 mb-4",
          children: "โค้ดนี้จะช่วยให้คุณสามารถจัดการข้อมูลตำแหน่งได้อย่างเป็นระบบ และสามารถนำไปใช้กับตารางอื่น ๆ ได้อย่างง่ายดาย"
        }), /* @__PURE__ */ jsx(CodeBlock, {
          code: positionControllerCode,
          language: "javascript"
        })]
      }), /* @__PURE__ */ jsx(Footer, {})]
    })]
  });
});
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sPositionController,
  meta: meta$f
}, Symbol.toStringTag, { value: "Module" }));
function meta$e({}) {
  return [{
    title: "Teacher Controller"
  }, {
    name: "description",
    content: "CRUD operations for the teachers table, including file uploads."
  }];
}
const teacherControllerCode = `// teacherController.js
import pool from '../db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// GET all teachers
export const getTeachers = async (req, res, next) => {
    try {
        const [rows] = await pool.query('SELECT * FROM teachers');
        res.json({ success: true, data: rows });
    } catch (err) {
        next(err);
    }
};

// CREATE teacher
export const createTeacher = async (req, res, next) => {
    try {
        const { name, address, telephone, position_id } = req.body;
        // แก้ไข: เก็บ Path เป็น /uploads/filename.jpg
        const img = req.file ? \`/uploads/\${req.file.filename}\` : null;

        if (!name || !address || !telephone || !position_id) {
            throw { status: 400, message: 'Name, address, telephone, and position_id are required' };
        }

        const [result] = await pool.query(
            'INSERT INTO teachers (name, address, telephone, position_id, img) VALUES (?, ?, ?, ?, ?)',
            [name, address, telephone, position_id, img]
        );
        res.json({ success: true, id: result.insertId });
    } catch (err) {
        next(err);
    }
};

// UPDATE teacher
export const updateTeacher = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, address, telephone, position_id } = req.body;
        // แก้ไข: เก็บ Path เป็น /uploads/filename.jpg
        const newImgPath = req.file ? \`/uploads/\${req.file.filename}\` : null;

        const [rows] = await pool.query('SELECT img FROM teachers WHERE id = ?', [id]);
        const oldImgPath = rows.length > 0 ? rows[0].img : null;
        
        let query;
        let params;

        if (newImgPath) {
            query = 'UPDATE teachers SET name=?, address=?, telephone=?, position_id=?, img=? WHERE id=?';
            params = [name, address, telephone, position_id, newImgPath, id];
        } else {
            query = 'UPDATE teachers SET name=?, address=?, telephone=?, position_id=? WHERE id=?';
            params = [name, address, telephone, position_id, id];
        }

        await pool.query(query, params);

        if (newImgPath && oldImgPath && oldImgPath !== '/uploads/default.svg') {
            // แก้ไข: ปรับเส้นทางลบไฟล์ให้ชี้ไปที่โฟลเดอร์ uploads ของ backend
            const oldServerFilePath = path.join(__dirname, '..', oldImgPath);
            try {
                await fs.access(oldServerFilePath);
                await fs.unlink(oldServerFilePath);
                console.log(\`Successfully deleted old image file: \${oldServerFilePath}\`);
            } catch (fileErr) {
                console.error(\`Error deleting old image file (might not exist): \${oldServerFilePath}\`, fileErr);
            }
        }

        res.json({ success: true, message: 'Updated successfully' });
    } catch (err) {
        next(err);
    }
};

// DELETE teacher
export const deleteTeacher = async (req, res, next) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.query('SELECT img FROM teachers WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Teacher not found' });
        }
        
        const imgPath = rows[0].img;

        await pool.query('DELETE FROM teachers WHERE id = ?', [id]);

        // แก้ไข: ปรับเส้นทางลบไฟล์ให้ชี้ไปที่โฟลเดอร์ uploads ของ backend
        if (imgPath && imgPath !== '/uploads/default.svg') {
            const serverFilePath = path.join(__dirname, '..', imgPath);
            
            try {
                await fs.access(serverFilePath);
                await fs.unlink(serverFilePath);
                console.log(\`Successfully deleted image file: \${serverFilePath}\`);
            } catch (fileErr) {
                console.error(\`Error deleting image file (might not exist): \${serverFilePath}\`, fileErr);
            }
        }

        res.json({ success: true, message: 'Teacher and associated image deleted successfully' });
    } catch (err) {
        console.error('Error during teacher deletion:', err);
        next(err);
    }
};`;
const sTeacherController = UNSAFE_withComponentProps(function TeacherControllerPage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-900 text-white p-8 font-sans",
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsxs("div", {
      className: "container mx-auto max-w-4xl pt-20",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text",
        children: "Teacher Controller"
      }), /* @__PURE__ */ jsxs("p", {
        className: "text-center text-gray-400 mb-10 text-lg",
        children: ["ตัวอย่างโค้ดสำหรับสร้าง", " ", /* @__PURE__ */ jsx("code", {
          className: "text-sm font-mono text-pink-400",
          children: "Controller"
        }), " ", "เพื่อจัดการข้อมูลครู (teachers) ซึ่งมีการจัดการรูปภาพประกอบด้วย"]
      }), /* @__PURE__ */ jsxs(motion.div, {
        className: "p-6 rounded-xl border-t-4 border-b-4 border-purple-500",
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5
        },
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold mb-4 text-white",
          children: "โครงสร้างและ Logic"
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-gray-400 mb-4",
          children: ["ไฟล์นี้ประกอบด้วยฟังก์ชันสำหรับดำเนินการ CRUD (Create, Read, Update, Delete) กับตาราง", " ", /* @__PURE__ */ jsx("code", {
            className: "text-sm font-mono text-yellow-300",
            children: "teachers"
          }), " ", "และยังรวมถึงการจัดการไฟล์รูปภาพที่อัปโหลด"]
        }), /* @__PURE__ */ jsx(CodeBlock, {
          code: teacherControllerCode,
          language: "javascript"
        })]
      }), /* @__PURE__ */ jsx(Footer, {})]
    })]
  });
});
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sTeacherController,
  meta: meta$e
}, Symbol.toStringTag, { value: "Module" }));
function meta$d({}) {
  return [{
    title: "Error Handling"
  }, {
    name: "description",
    content: "Express.js error handler middleware."
  }];
}
const errorHandlerCode = `export const errorHandler = (err, req, res, next) => {
    console.error('❌ Error:', err.message || err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
};`;
const sErrorHandler = UNSAFE_withComponentProps(function ErrorHandlerPage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-900 text-white p-8 font-sans",
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsxs("div", {
      className: "container mx-auto max-w-4xl pt-20",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text",
        children: "การจัดการข้อผิดพลาด (Error Handling)"
      }), /* @__PURE__ */ jsx("p", {
        className: "text-center text-gray-400 mb-10 text-lg",
        children: "โค้ดสำหรับสร้าง Global Error Handler Middleware เพื่อดักจับและจัดการข้อผิดพลาดที่เกิดขึ้นในเซิร์ฟเวอร์"
      }), /* @__PURE__ */ jsxs(motion.div, {
        className: "p-6 rounded-xl border-t-4 border-b-4 border-purple-500",
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5
        },
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold mb-4 text-white",
          children: "errorHandler.js (หรือ errorHandler.ts)"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-gray-400 mb-4",
          children: "Middleware นี้จะถูกเรียกใช้เมื่อเกิดข้อผิดพลาดใด ๆ ใน Express.js โดยจะส่งรหัสสถานะและข้อความกลับไปเพื่อให้ Client ทราบถึงปัญหาที่เกิดขึ้น"
        }), /* @__PURE__ */ jsx(CodeBlock, {
          code: errorHandlerCode,
          language: "javascript"
        })]
      }), /* @__PURE__ */ jsx(Footer, {})]
    })]
  });
});
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sErrorHandler,
  meta: meta$d
}, Symbol.toStringTag, { value: "Module" }));
function meta$c({}) {
  return [{
    title: "Default SVG"
  }, {
    name: "description",
    content: "Default profile image SVG icon."
  }];
}
const defaultSvgCode = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>`;
const sDefaultSvg = UNSAFE_withComponentProps(function DefaultSvgPage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-900 text-white p-8 font-sans",
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsxs("div", {
      className: "container mx-auto max-w-4xl pt-20",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text",
        children: "Default Profile SVG"
      }), /* @__PURE__ */ jsxs("p", {
        className: "text-center text-gray-400 mb-10 text-lg",
        children: ["โค้ดสำหรับไฟล์", " ", /* @__PURE__ */ jsx("code", {
          className: "text-sm font-mono text-pink-400",
          children: "default.svg"
        }), " ", "ซึ่งเป็น SVG icon ที่ใช้เป็นรูปภาพโปรไฟล์เริ่มต้น"]
      }), /* @__PURE__ */ jsxs(motion.div, {
        className: "p-6 rounded-xl border-t-4 border-b-4 border-purple-500",
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5
        },
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold mb-4 text-white",
          children: "โครงสร้างและ Logic"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-gray-400 mb-4",
          children: "โค้ดนี้สร้าง React Component ที่สามารถนำไปใช้เป็น SVG icon สำหรับรูปโปรไฟล์ที่ไม่มีภาพในฐานข้อมูล"
        }), /* @__PURE__ */ jsx(CodeBlock, {
          code: defaultSvgCode,
          language: "xml"
        })]
      }), /* @__PURE__ */ jsx(Footer, {})]
    })]
  });
});
const route9 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sDefaultSvg,
  meta: meta$c
}, Symbol.toStringTag, { value: "Module" }));
function meta$b({}) {
  return [{
    title: "Main Router"
  }, {
    name: "description",
    content: "Main Express router setup."
  }];
}
const routerCode = `import express from 'express';
import positionRoutes from './positionRoutes.js';
import teacherRoutes from './teacherRoutes.js';

const router = express.Router();

// Main routes
router.use('/positions', positionRoutes);
router.use('/teachers', teacherRoutes);

export default router;`;
const sIndex = UNSAFE_withComponentProps(function RouterPage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-900 text-white p-8 font-sans",
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsxs("div", {
      className: "container mx-auto max-w-4xl pt-20",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text",
        children: "การจัดการเราเตอร์หลัก"
      }), /* @__PURE__ */ jsx("p", {
        className: "text-center text-gray-400 mb-10 text-lg",
        children: "ตัวอย่างโค้ดสำหรับสร้างเราเตอร์หลักใน Express.js เพื่อแยกการจัดการเส้นทางตามแต่ละส่วนของแอปพลิเคชัน"
      }), /* @__PURE__ */ jsxs(motion.div, {
        className: "p-6 rounded-xl border-t-4 border-b-4 border-purple-500",
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5
        },
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold mb-4 text-white",
          children: "index.js (หรือ index.ts)"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-gray-400 mb-4",
          children: "โค้ดนี้จะช่วยให้คุณสามารถเพิ่มเส้นทางใหม่ ๆ ได้อย่างง่ายดายและเป็นระบบมากขึ้น"
        }), /* @__PURE__ */ jsx(CodeBlock, {
          code: routerCode,
          language: "javascript"
        })]
      }), /* @__PURE__ */ jsx(Footer, {})]
    })]
  });
});
const route10 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sIndex,
  meta: meta$b
}, Symbol.toStringTag, { value: "Module" }));
function meta$a({}) {
  return [{
    title: "Position Routes"
  }, {
    name: "description",
    content: "Express.js routes for positions."
  }];
}
const positionRoutesCode = `import express from 'express';
import {
    getPositions,
    createPosition,
    updatePosition,
    deletePosition
} from '../controllers/positionController.js';

const router = express.Router();

router.get('/', getPositions);
router.post('/', createPosition);
router.put('/:id', updatePosition);
router.delete('/:id', deletePosition);

export default router;`;
const sPositionRoutes = UNSAFE_withComponentProps(function PositionRoutesPage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-900 text-white p-8 font-sans",
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsxs("div", {
      className: "container mx-auto max-w-4xl pt-20",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text",
        children: "การจัดการเส้นทาง (Routes)"
      }), /* @__PURE__ */ jsxs("p", {
        className: "text-center text-gray-400 mb-10 text-lg",
        children: ["โค้ดสำหรับไฟล์", " ", /* @__PURE__ */ jsx("code", {
          className: "text-sm font-mono text-pink-400",
          children: "positionRoutes.js"
        }), " ", "ที่ใช้กำหนดเส้นทาง API สำหรับการจัดการข้อมูลตำแหน่ง"]
      }), /* @__PURE__ */ jsxs(motion.div, {
        className: "p-6 rounded-xl border-t-4 border-b-4 border-purple-500",
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5
        },
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold mb-4 text-white",
          children: "ตำแหน่งของไฟล์"
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-gray-400 mb-4",
          children: ["ไฟล์นี้จะอยู่ในโฟลเดอร์", " ", /* @__PURE__ */ jsx("code", {
            className: "text-sm font-mono text-yellow-300",
            children: "routes/"
          }), " ", "และจะถูกเรียกใช้ในเราเตอร์หลักของแอปพลิเคชัน"]
        }), /* @__PURE__ */ jsx(CodeBlock, {
          code: positionRoutesCode,
          language: "javascript"
        })]
      }), /* @__PURE__ */ jsx(Footer, {})]
    })]
  });
});
const route11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sPositionRoutes,
  meta: meta$a
}, Symbol.toStringTag, { value: "Module" }));
function meta$9({}) {
  return [{
    title: "Teacher Routes"
  }, {
    name: "description",
    content: "Express.js routes for teachers, including file uploads."
  }];
}
const teacherRoutesCode = `// teacherRoutes.js
import express from 'express';
import {
    getTeachers,
    createTeacher,
    updateTeacher,
    deleteTeacher
} from '../controllers/teacherController.js';
import { upload } from '../middleware/upload.js'; // สมมติว่าไฟล์นี้มี multer middleware ที่ถูกต้อง

const router = express.Router();

router.get('/', getTeachers);
router.post('/', upload.single('img'), createTeacher);
router.put('/:id', upload.single('img'), updateTeacher);
router.delete('/:id', deleteTeacher);

export default router;`;
const sTeacherRoutes = UNSAFE_withComponentProps(function TeacherRoutesPage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-900 text-white p-8 font-sans",
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsxs("div", {
      className: "container mx-auto max-w-4xl pt-20",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text",
        children: "การจัดการเส้นทาง (Routes) สำหรับครู"
      }), /* @__PURE__ */ jsxs("p", {
        className: "text-center text-gray-400 mb-10 text-lg",
        children: ["โค้ดสำหรับไฟล์", " ", /* @__PURE__ */ jsx("code", {
          className: "text-sm font-mono text-pink-400",
          children: "teacherRoutes.js"
        }), " ", "ที่ใช้กำหนดเส้นทาง API สำหรับการจัดการข้อมูลครู"]
      }), /* @__PURE__ */ jsxs(motion.div, {
        className: "p-6 rounded-xl border-t-4 border-b-4 border-purple-500",
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5
        },
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold mb-4 text-white",
          children: "การรวม Middleware"
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-gray-400 mb-4",
          children: ["ไฟล์นี้จะใช้", " ", /* @__PURE__ */ jsx("code", {
            className: "text-sm font-mono text-yellow-300",
            children: "upload.single('img')"
          }), " ", "เป็น middleware เพื่อจัดการไฟล์รูปภาพที่อัปโหลดก่อนจะส่งต่อไปยัง controller"]
        }), /* @__PURE__ */ jsx(CodeBlock, {
          code: teacherRoutesCode,
          language: "javascript"
        })]
      }), /* @__PURE__ */ jsx(Footer, {})]
    })]
  });
});
const route12 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sTeacherRoutes,
  meta: meta$9
}, Symbol.toStringTag, { value: "Module" }));
function meta$8({}) {
  return [{
    title: "Navigation Bar"
  }, {
    name: "description",
    content: "Main navigation component for React application."
  }];
}
const navCode = `import { Link, useLocation } from 'react-router';
import { motion } from 'framer-motion';

// Main navigation links (now with a flat structure, no dropdowns)
const navLinks = [
    { name: 'Dashboard', href: '/' },
    { name: 'Positions', href: '/positions' },
    { name: 'Teachers', href: '/teachers' },
];

// Logo component using the favicon from the public folder
const Logo = () => (
    <img
        src="/favicon.ico"
        alt="React Router Logo"
        className="w-6 h-6"
    />
);

export default function Nav() {
    const location = useLocation();
    const activePath = location.pathname;

    return (
        <div className="flex justify-center w-full bg-black/80 backdrop-blur-sm fixed top-0 z-50">
            <div className="flex items-center justify-between w-full max-w-7xl px-4 py-2">
                {/* Title and Logo */}
                <div className="flex items-center space-x-2">
                    <Link to="/" className="flex items-center space-x-2">
                        <Logo />
                        <span className="text-white text-lg font-bold">Reach-Rounter v7</span>
                    </Link>
                </div>

                {/* Navigation Links (no dropdowns) */}
                <nav className="flex items-center">
                    <ul className="flex items-center space-x-2">
                        {navLinks.map((link) => {
                            const isActive = activePath === link.href;
                            
                            return (
                                <li key={link.name} className="relative">
                                    <Link
                                        to={link.href}
                                        className={\`relative z-20 block px-4 py-2 text-sm rounded-md transition-colors duration-300
                                            \${isActive ? 'text-white' : 'text-gray-300 hover:text-white'}\`}
                                    >
                                        {link.name}
                                    </Link>

                                    {/* Highlight background (displays when the link is active) */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="active-nav-link"
                                            className="absolute inset-0 bg-white/10 rounded-md z-10"
                                            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                        />
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </div>
    );
}`;
const sNav = UNSAFE_withComponentProps(function NavPage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-900 text-white p-8 font-sans",
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsxs("div", {
      className: "container mx-auto max-w-4xl pt-20",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text",
        children: "Navigation Bar"
      }), /* @__PURE__ */ jsxs("p", {
        className: "text-center text-gray-400 mb-10 text-lg",
        children: ["โค้ดสำหรับไฟล์", " ", /* @__PURE__ */ jsx("code", {
          className: "text-sm font-mono text-pink-400",
          children: "Nav.tsx"
        }), " ", "ซึ่งเป็นคอมโพเนนต์หลักในการนำทางไปยังหน้าต่างๆ ของแอปพลิเคชัน"]
      }), /* @__PURE__ */ jsxs(motion.div, {
        className: "p-6 rounded-xl border-t-4 border-b-4 border-purple-500",
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5
        },
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold mb-4 text-white",
          children: "การทำงานและเทคโนโลยี"
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-gray-400 mb-4",
          children: ["โค้ดนี้ใช้", " ", /* @__PURE__ */ jsx("code", {
            className: "text-sm font-mono text-yellow-300",
            children: "react-router"
          }), " ", "ในการจัดการเส้นทางและ", " ", /* @__PURE__ */ jsx("code", {
            className: "text-sm font-mono text-yellow-300",
            children: "framer-motion"
          }), " ", "เพื่อสร้างเอฟเฟกต์การเปลี่ยนหน้าที่มีความลื่นไหล"]
        }), /* @__PURE__ */ jsx(CodeBlock, {
          code: navCode,
          language: "tsx"
        })]
      }), /* @__PURE__ */ jsx(Footer, {})]
    })]
  });
});
const route13 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sNav,
  meta: meta$8
}, Symbol.toStringTag, { value: "Module" }));
function meta$7({}) {
  return [{
    title: "Home Code"
  }, {
    name: "description",
    content: "Source code for the Dashboard page."
  }];
}
const homeCode = `
import React from 'react';
import { motion } from 'framer-motion';
import Nav from '~/components/Nav';
import type { Route } from '../+types/root';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Dashboard"},
    { name: "description", content: "Welcome to React Router!" },
  ];
}

// 💅 1. ปรับขนาด SVG ให้เล็กลงเพื่อใส่ในกรอบ
const NodeJsIcon = () => (
    <svg width="267" height="80" viewBox="0 0 267 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-[#333333] w-20 h-20 dark:fill-white index-module__oMcDnW__nodejsLogo" aria-label="Node.js logo"><mask id="a" maskUnits="userSpaceOnUse" x="0" y="0" width="267" height="80" ><path d="M267 0H0v79.378h267z" fill="#fff"></path></mask><g mask="url(#a)"><path d="M234.983 78.755a4 4 0 0 1-1.933-.51l-6.121-3.658c-.921-.51-.46-.695-.184-.787 1.242-.417 1.472-.51 2.761-1.25.138-.093.322-.047.46.046l4.694 2.825c.184.092.414.092.552 0l18.363-10.698c.183-.092.277-.277.277-.509V42.867c0-.232-.094-.417-.277-.51l-18.363-10.65c-.184-.093-.414-.093-.552 0l-18.362 10.65c-.184.093-.276.324-.276.51v21.347c0 .186.092.417.276.51l5.016 2.917c2.715 1.39 4.418-.232 4.418-1.852v-21.07c0-.278.23-.556.553-.556h2.347c.276 0 .552.232.552.556v21.07c0 3.658-1.979 5.788-5.431 5.788-1.058 0-1.886 0-4.234-1.157l-4.832-2.779a3.91 3.91 0 0 1-1.933-3.38V42.912c0-1.39.737-2.686 1.933-3.38l18.363-10.697c1.15-.649 2.715-.649 3.865 0l18.363 10.696a3.91 3.91 0 0 1 1.932 3.381V64.26c0 1.39-.736 2.686-1.932 3.381l-18.363 10.697c-.552.232-1.242.417-1.932.417" fill="#5FA04E"></path><path d="M240.69 64.075c-8.055 0-9.712-3.705-9.712-6.854 0-.277.23-.555.552-.555h2.393c.277 0 .507.185.507.463.368 2.454 1.426 3.658 6.305 3.658 3.866 0 5.523-.88 5.523-2.963 0-1.204-.462-2.084-6.49-2.686-5.016-.51-8.146-1.621-8.146-5.65 0-3.75 3.13-5.974 8.376-5.974 5.892 0 8.791 2.038 9.159 6.484a.76.76 0 0 1-.137.416c-.094.093-.231.186-.371.186h-2.439a.54.54 0 0 1-.505-.417c-.553-2.547-1.98-3.38-5.753-3.38-4.234 0-4.74 1.481-4.74 2.593 0 1.342.598 1.76 6.305 2.5 5.66.741 8.33 1.806 8.33 5.788 0 4.076-3.36 6.391-9.157 6.391m26.51-22.413c0 1.945-1.612 3.566-3.546 3.566a3.556 3.556 0 0 1-3.543-3.566 3.556 3.556 0 0 1 3.543-3.565c1.888 0 3.546 1.574 3.546 3.565m-6.536 0c0 1.667 1.335 3.01 2.944 3.01 1.658 0 2.993-1.39 2.993-3.01 0-1.667-1.335-2.963-2.993-2.963a2.975 2.975 0 0 0-2.944 2.963m1.657-1.991h1.381c.46 0 1.381 0 1.381 1.065 0 .74-.462.88-.739.973.554.046.599.416.645.926.046.324.094.88.185 1.065h-.83c0-.186-.137-1.204-.137-1.25-.045-.232-.137-.325-.413-.325h-.691v1.62h-.782zm.736 1.76h.597c.508 0 .599-.37.599-.556 0-.556-.368-.556-.599-.556h-.642v1.112z" fill="#5FA04E"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M43.674 41.954c0-.834-.46-1.62-1.197-2.038L23.01 28.572c-.322-.185-.69-.278-1.058-.324h-.184c-.368 0-.736.139-1.059.324l-19.512 11.3A2.38 2.38 0 0 0 0 41.953l.046 30.378c0 .416.23.833.598 1.018.368.232.829.232 1.15 0l11.598-6.668a2.36 2.36 0 0 0 1.197-2.037V50.428c0-.833.46-1.62 1.196-2.037l4.924-2.871a2.2 2.2 0 0 1 1.197-.325c.414 0 .828.093 1.15.325l4.925 2.87a2.36 2.36 0 0 1 1.196 2.038v14.217c0 .833.46 1.62 1.197 2.037l11.505 6.668c.368.232.828.232 1.197 0 .368-.185.598-.602.598-1.018zM137.465.139c-.369-.185-.829-.185-1.151 0-.368.231-.598.602-.598 1.019v30.1a.89.89 0 0 1-.415.74.88.88 0 0 1-.828 0l-4.878-2.825a2.36 2.36 0 0 0-2.347 0L107.735 40.52a2.36 2.36 0 0 0-1.196 2.037V65.2c0 .834.46 1.621 1.196 2.038l19.513 11.345a2.36 2.36 0 0 0 2.347 0l19.513-11.345a2.36 2.36 0 0 0 1.196-2.038V8.752c0-.88-.46-1.667-1.196-2.084zm-1.795 57.606c0 .232-.092.417-.276.51l-6.674 3.89a.68.68 0 0 1-.598 0l-6.673-3.89c-.184-.093-.276-.325-.276-.51v-7.78c0-.231.092-.416.276-.509l6.673-3.89a.68.68 0 0 1 .598 0l6.674 3.89c.184.093.276.324.276.51zm66.728-7.965c.737-.417 1.151-1.204 1.151-2.038v-5.51c0-.834-.46-1.62-1.151-2.037l-19.375-11.3a2.36 2.36 0 0 0-2.347 0l-19.512 11.346a2.36 2.36 0 0 0-1.197 2.037v22.645c0 .833.46 1.62 1.197 2.037l19.374 11.114c.737.416 1.611.416 2.301 0l11.736-6.576c.368-.185.598-.602.598-1.019s-.23-.833-.598-1.018L174.97 58.115c-.368-.231-.598-.602-.598-1.018v-7.085c0-.417.23-.834.598-1.02l6.121-3.518a1.12 1.12 0 0 1 1.196 0l6.121 3.519c.368.231.598.602.598 1.019v5.557c0 .416.23.833.599 1.018.368.232.828.232 1.196 0z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M181.551 48.716a.42.42 0 0 1 .461 0l3.727 2.176c.138.092.23.231.23.417v4.352a.49.49 0 0 1-.23.417l-3.727 2.177a.42.42 0 0 1-.461 0l-3.727-2.177a.49.49 0 0 1-.23-.417V51.31c0-.185.092-.325.23-.417z" fill="#5FA04E"></path><g transform="translate(53.428, 28.628)"><g opacity="1"><path fill="url(#b)" d="M22.873.417a2.36 2.36 0 0 0-2.348 0L1.151 11.669C.414 12.086 0 12.873 0 13.707v22.551c0 .834.46 1.621 1.15 2.038l19.375 11.253a2.36 2.36 0 0 0 2.348 0l19.374-11.253c.737-.417 1.15-1.204 1.15-2.038V13.707c0-.834-.46-1.62-1.15-2.038z"></path><path fill="url(#c)" clip-path="url(#d)" d="m21.699-1.047 21.506 12.995L21.7 51.073.153 38.055z"></path><path fill="url(#e)" clip-path="url(#d)" d="M21.699-1.047.153 11.948l21.546 39.125 21.506-13.018z"></path></g></g></g><defs><linearGradient id="b" x1="30.33" y1="8.56" x2="14.9" y2="44.7" gradientUnits="userSpaceOnUse"><stop stop-color="#3F8B3D"></stop><stop offset="0.64" stop-color="#3F873F"></stop><stop offset="0.93" stop-color="#3DA92E"></stop><stop offset="1" stop-color="#3DAE2B"></stop></linearGradient><linearGradient id="c" x1="18.8" y1="26.8" x2="68" y2="0.4" gradientUnits="userSpaceOnUse"><stop offset="0.14" stop-color="#3F873F"></stop><stop offset="0.4" stop-color="#52A044"></stop><stop offset="0.71" stop-color="#64B749"></stop><stop offset="0.91" stop-color="#6ABF4B"></stop></linearGradient><linearGradient id="e" x1="0.25" y1="24.5" x2="44" y2="24.5" gradientUnits="userSpaceOnUse"><stop offset="0.09" stop-color="#6ABF4B"></stop><stop offset="0.29" stop-color="#64B749"></stop><stop offset="0.6" stop-color="#52A044"></stop><stop offset="0.86" stop-color="#3F873F"></stop></linearGradient><clipPath id="d"><path d="M22.873.417a2.36 2.36 0 0 0-2.348 0L1.151 11.669C.414 12.086 0 12.873 0 13.707v22.551c0 .834.46 1.621 1.15 2.038l19.375 11.253a2.36 2.36 0 0 0 2.348 0l19.374-11.253c.737-.417 1.15-1.204 1.15-2.038V13.707c0-.834-.46-1.62-1.15-2.038z"></path></clipPath></defs></svg>
);
const ExpressJsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 50 50" className="w-12 h-12">
        <path d="M49.729 11h-.85c-1.051 0-2.041.49-2.68 1.324l-8.7 11.377-8.7-11.377C28.162 11.49 27.171 11 26.121 11h-.85l10.971 14.346L25.036 40h.85c1.051 0 2.041-.49 2.679-1.324L37.5 26.992l8.935 11.684C47.073 39.51 48.063 40 49.114 40h.85L38.758 25.346 49.729 11zM21.289 34.242c-2.554 3.881-7.582 5.87-12.389 4.116C4.671 36.815 2 32.611 2 28.109L2 27h12v0h11l0-4.134c0-6.505-4.818-12.2-11.295-12.809C6.273 9.358 0 15.21 0 22.5l0 5.573c0 5.371 3.215 10.364 8.269 12.183 6.603 2.376 13.548-1.17 15.896-7.256 0 0 0 0 0 0h-.638C22.616 33 21.789 33.481 21.289 34.242zM2 22.5C2 16.71 6.71 12 12.5 12S23 16.71 23 22.5V25H2V22.5z"></path>
    </svg>
);
const MySQLIcon = () => (
<svg xmlns="http://www.w3.org/2000/svg" width="800px" height="800px" viewBox="-18.458 -22.75 191.151 191.151"><path d="M-18.458 6.58h191.151v132.49H-18.458V6.58z" fill="none"/><path d="M40.054 113.583h-5.175c-.183-8.735-.687-16.947-1.511-24.642h-.046l-7.879 24.642h-3.94l-7.832-24.642h-.045c-.581 7.388-.947 15.602-1.099 24.642H7.81c.304-10.993 1.068-21.299 2.289-30.919h6.414l7.465 22.719h.046l7.511-22.719h6.137c1.344 11.268 2.138 21.575 2.382 30.919M62.497 90.771c-2.107 11.434-4.887 19.742-8.337 24.928-2.688 3.992-5.633 5.99-8.84 5.99-.855 0-1.91-.258-3.16-.77v-2.757c.611.088 1.328.138 2.152.138 1.498 0 2.702-.412 3.62-1.238 1.098-1.006 1.647-2.137 1.647-3.388 0-.858-.428-2.612-1.282-5.268L42.618 90.77h5.084l4.076 13.19c.916 2.995 1.298 5.086 1.145 6.277 2.229-5.953 3.786-12.444 4.673-19.468h4.901v.002z" fill="#5d87a1"/><path d="M131.382 113.583h-14.7V82.664h4.945v27.113h9.755v3.806zM112.834 114.33l-5.684-2.805c.504-.414.986-.862 1.42-1.381 2.416-2.838 3.621-7.035 3.621-12.594 0-10.229-4.014-15.346-12.045-15.346-3.938 0-7.01 1.298-9.207 3.895-2.414 2.84-3.619 7.022-3.619 12.551 0 5.435 1.068 9.422 3.205 11.951 1.955 2.291 4.902 3.438 8.843 3.438 1.47 0 2.819-.18 4.048-.543l7.4 4.308 2.018-3.474zm-18.413-6.934c-1.252-2.014-1.878-5.248-1.878-9.707 0-7.785 2.365-11.682 7.1-11.682 2.475 0 4.289.932 5.449 2.792 1.25 2.017 1.879 5.222 1.879 9.619 0 7.849-2.367 11.774-7.099 11.774-2.476.001-4.29-.928-5.451-2.796M85.165 105.013c0 2.622-.962 4.773-2.884 6.458-1.924 1.678-4.504 2.519-7.737 2.519-3.024 0-5.956-.966-8.794-2.888l1.329-2.655c2.442 1.223 4.653 1.831 6.638 1.831 1.863 0 3.319-.413 4.375-1.232 1.055-.822 1.684-1.975 1.684-3.433 0-1.837-1.281-3.407-3.631-4.722-2.167-1.19-6.501-3.678-6.501-3.678-2.349-1.712-3.525-3.55-3.525-6.578 0-2.506.877-4.529 2.632-6.068 1.757-1.545 4.024-2.315 6.803-2.315 2.87 0 5.479.769 7.829 2.291l-1.192 2.656c-2.01-.854-3.994-1.281-5.951-1.281-1.585 0-2.809.381-3.66 1.146-.858.762-1.387 1.737-1.387 2.933 0 1.828 1.308 3.418 3.722 4.759 2.196 1.192 6.638 3.723 6.638 3.723 2.409 1.709 3.612 3.53 3.612 6.534" fill="#f8981d"/><path d="M137.59 72.308c-2.99-.076-5.305.225-7.248 1.047-.561.224-1.453.224-1.531.933.303.3.338.784.601 1.198.448.747 1.229 1.752 1.942 2.276.783.6 1.569 1.194 2.393 1.717 1.453.899 3.1 1.422 4.516 2.318.825.521 1.645 1.195 2.471 1.756.406.299.666.784 1.193.971v-.114c-.264-.336-.339-.822-.598-1.196l-1.122-1.082c-1.084-1.456-2.431-2.727-3.884-3.771-1.196-.824-3.812-1.944-4.297-3.322l-.076-.076c.822-.077 1.797-.375 2.578-.604 1.271-.335 2.43-.259 3.734-.594.6-.15 1.195-.338 1.797-.523v-.337c-.676-.673-1.158-1.567-1.869-2.203-1.902-1.643-3.998-3.25-6.164-4.595-1.16-.749-2.652-1.231-3.887-1.868-.445-.225-1.195-.336-1.457-.71-.67-.822-1.047-1.904-1.533-2.877-1.08-2.053-2.129-4.331-3.061-6.502-.674-1.456-1.084-2.91-1.906-4.257-3.85-6.35-8.031-10.196-14.457-13.971-1.381-.786-3.024-1.121-4.779-1.533l-2.803-.148c-.598-.262-1.197-.973-1.719-1.309-2.132-1.344-7.621-4.257-9.189-.411-1.01 2.431 1.494 4.821 2.354 6.054.635.856 1.458 1.83 1.902 2.802.263.635.337 1.309.6 1.98.598 1.644 1.157 3.473 1.943 5.007.41.782.857 1.604 1.381 2.312.3.414.822.597.936 1.272-.521.744-.562 1.867-.861 2.801-1.344 4.221-.819 9.45 1.086 12.552.596.934 2.018 2.99 3.92 2.202 1.684-.672 1.311-2.801 1.795-4.668.111-.451.038-.747.262-1.043v.073c.521 1.045 1.047 2.052 1.53 3.1 1.159 1.829 3.177 3.735 4.858 5.002.895.676 1.604 1.832 2.725 2.245V74.1h-.074c-.227-.335-.559-.485-.857-.745-.674-.673-1.42-1.495-1.943-2.241-1.566-2.093-2.952-4.41-4.182-6.801-.602-1.16-1.121-2.428-1.606-3.586-.226-.447-.226-1.121-.601-1.346-.562.821-1.381 1.532-1.791 2.538-.711 1.609-.785 3.588-1.049 5.646l-.147.072c-1.19-.299-1.604-1.53-2.056-2.575-1.119-2.654-1.307-6.914-.336-9.976.26-.783 1.385-3.249.936-3.995-.225-.715-.973-1.122-1.383-1.685-.482-.708-1.01-1.604-1.346-2.39-.896-2.091-1.347-4.408-2.312-6.498-.451-.974-1.234-1.982-1.868-2.879-.712-1.008-1.495-1.718-2.058-2.913-.186-.411-.447-1.083-.148-1.53.073-.3.225-.412.523-.487.484-.409 1.867.111 2.352.336 1.385.56 2.543 1.083 3.699 1.867.523.375 1.084 1.085 1.755 1.272h.786c1.193.26 2.538.072 3.661.41 1.979.636 3.772 1.569 5.38 2.576 4.893 3.103 8.928 7.512 11.652 12.778.447.858.637 1.644 1.045 2.539.787 1.832 1.76 3.7 2.541 5.493.785 1.755 1.533 3.547 2.654 5.005.559.784 2.805 1.195 3.812 1.606.745.335 1.905.633 2.577 1.044 1.271.783 2.537 1.682 3.732 2.543.595.448 2.465 1.382 2.576 2.13M99.484 39.844a5.82 5.82 0 0 0-1.529.188v.075h.072c.301.597.824 1.011 1.197 1.532.301.599.562 1.193.857 1.791l.072-.074c.527-.373.789-.971.789-1.868-.227-.264-.262-.522-.451-.784-.22-.374-.705-.56-1.007-.86" fill="#5d87a1"/><path d="M141.148 113.578h.774v-3.788h-1.161l-.947 2.585-1.029-2.585h-1.118v3.788h.731v-2.882h.041l1.078 2.882h.557l1.074-2.882v2.882zm-6.235 0h.819v-3.146h1.072v-.643h-3.008v.643h1.115l.002 3.146z" fill="#f8981d"/></svg>
);
const ReactRouterIcon = () => (
    <svg width="602" height="360" viewBox="0 0 602 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12">
        <path d="M481.36 180C481.36 196.572 474.638 211.572 463.757 222.42C452.875 233.28 437.845 240 421.24 240C404.635 240 389.605 246.708 378.735 257.568C367.853 268.428 361.12 283.428 361.12 300C361.12 316.572 354.398 331.572 343.517 342.42C332.635 353.28 317.605 360 301 360C284.395 360 269.365 353.28 258.495 342.42C247.613 331.572 240.88 316.572 240.88 300C240.88 283.428 247.613 268.428 258.495 257.568C269.365 246.708 284.395 240 301 240C317.605 240 332.635 233.28 343.517 222.42C354.398 211.572 361.12 196.572 361.12 180C361.12 146.856 334.21 120 301 120C284.395 120 269.365 113.28 258.495 102.42C247.613 91.572 240.88 76.572 240.88 60C240.88 43.428 247.613 28.428 258.495 17.568C269.365 6.708 284.395 0 301 0C334.21 0 361.12 26.856 361.12 60C361.12 76.572 367.853 91.572 378.735 102.42C389.605 113.28 404.635 120 421.24 120C454.45 120 481.36 146.856 481.36 180Z" fill="#F44250"/>
        <path d="M240.88 180C240.88 146.862 213.963 120 180.76 120C147.557 120 120.64 146.862 120.64 180C120.64 213.137 147.557 240 180.76 240C213.963 240 240.88 213.137 240.88 180Z" fill="white"/>
        <path d="M120.64 300C120.64 266.863 93.7233 240 60.5199 240C27.3165 240 0.399902 266.863 0.399902 300C0.399902 333.138 27.3165 360 60.5199 360C93.7233 360 120.64 333.138 120.64 300Z" fill="white"/>
        <path d="M601.6 300C601.6 266.863 574.683 240 541.48 240C508.277 240 481.36 266.863 481.36 300C481.36 333.138 508.277 360 541.48 360C574.683 360 601.6 333.138 601.6 300Z" fill="white"/>
    </svg>
);
const FramerMotionIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 24 24" className="w-12 h-12">
        <path d="M5.811,1H19c0.552,0,1,0.448,1,1v6c0,0.552-0.448,1-1,1h-7L5.28,2.28C4.808,1.808,5.142,1,5.811,1z" opacity=".35"></path><path d="M5,9h7l6.72,6.72c0.472,0.472,0.138,1.28-0.53,1.28H5c-0.552,0-1-0.448-1-1v-6C4,9.448,4.448,9,5,9z"></path><path d="M4,10v6.006c0,0.637,0.253,1.247,0.703,1.697l6.017,6.017c0.472,0.472,1.28,0.138,1.28-0.53V9H5 C4.448,9,4,9.448,4,10z" opacity=".35"></path>
    </svg>
);
const TailwindCssIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48" className="w-12 h-12">
        <linearGradient id="iOmQfjoCC4Hw6zVwRjSDha_x7XMNGh2vdqA_gr1" x1="21.861" x2="25.703" y1="8.237" y2="36.552" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#00c1e0"></stop><stop offset="1" stop-color="#009bb8"></stop></linearGradient><path fill="url(#iOmQfjoCC4Hw6zVwRjSDha_x7XMNGh2vdqA_gr1)" d="M24,9.604c-5.589,0-9.347,2.439-11.276,7.318c-0.2,0.505,0.417,0.92,0.816,0.551 c2.035-1.882,4.322-2.505,6.86-1.871c1.826,0.456,3.131,1.781,4.576,3.247C27.328,21.236,30.051,24,36,24 c5.589,0,9.348-2.44,11.276-7.319c0.2-0.505-0.417-0.92-0.816-0.551c-2.035,1.882-4.322,2.506-6.86,1.872 c-1.825-0.456-3.13-1.781-4.575-3.247C32.672,12.367,29.948,9.604,24,9.604L24,9.604z M12,24c-5.589,0-9.348,2.44-11.276,7.319 c-0.2,0.505,0.417,0.92,0.816,0.551c2.035-1.882,4.322-2.506,6.86-1.871c1.825,0.457,3.13,1.781,4.575,3.246 c2.353,2.388,5.077,5.152,11.025,5.152c5.589,0,9.348-2.44,11.276-7.319c0.2-0.505-0.417-0.92-0.816-0.551 c-2.035,1.882-4.322-2.506-6.86,1.871c-1.826-0.456-3.131-1.781-4.576-3.246C20.672,26.764,17.949,24,12,24L12,24z"></path>
    </svg>
);
const ViteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48" className="w-12 h-12">
        <linearGradient id="oOTIjsOjTqJdvfy5S4iCZa_dJjTWMogzFzg_gr1" x1="13.315" x2="38.005" y1="514.906" y2="481.377" gradientTransform="matrix(1 0 0 -1 0 514)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#41d1ff"></stop><stop offset="1" stop-color="#9231be"></stop></linearGradient><path fill="url(#oOTIjsOjTqJdvfy5S4iCZa_dJjTWMogzFzg_gr1)" d="M44.86,9.976L25.023,45.448c-0.41,0.732-1.462,0.737-1.878,0.008L2.915,9.979 C2.462,9.185,3.141,8.223,4.041,8.384l19.859,3.55c0.127,0.023,0.256,0.022,0.383-0.001l19.443-3.544 C44.623,8.225,45.305,9.18,44.86,9.976z"></path><linearGradient id="oOTIjsOjTqJdvfy5S4iCZb_dJjTWMogzFzg_gr2" x1="25.502" x2="37.131" y1="508.764" y2="428.99" gradientTransform="matrix(1 0 0 -1 0 514)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fed100"></stop><stop offset="1" stop-color="#e36001"></stop></linearGradient><path fill="url(#oOTIjsOjTqJdvfy5S4iCZb_dJjTWMogzFzg_gr2)" d="M33.574,3.01L19.019,5.862c-0.239,0.047-0.416,0.25-0.431,0.493l-0.895,15.121 c-0.021,0.356,0.306,0.633,0.654,0.552l4.052-0.935c0.379-0.087,0.722,0.246,0.644,0.628l-1.204,5.895 c-0.081,0.397,0.291,0.736,0.679,0.618l2.503-0.76c0.388-0.118,0.761,0.222,0.679,0.62l-1.913,9.26 c-0.12,0.579,0.651,0.895,0.972,0.398l0.215-0.332l11.86-23.669c0.199-0.396-0.144-0.848-0.579-0.764l-4.171,0.805 c-0.392,0.076-0.725-0.289-0.615-0.673l2.722-9.438C34.301,3.299,33.967,2.933,33.574,3.01z"></path>
    </svg>
);

const frameworks = [
  { name: 'Node.js', description: 'แพลตฟอร์ม JavaScript สำหรับการพัฒนาฝั่งเซิร์ฟเวอร์', icon: <NodeJsIcon />, link: 'https://nodejs.org/en' },
  { name: 'Express.js', description: 'เว็บ Framework สำหรับ Node.js ที่มีประสิทธิภาพและยืดหยุ่น', icon: <ExpressJsIcon />, link: 'https://expressjs.com/' },
  { name: 'MySQL', description: 'ระบบจัดการฐานข้อมูลเชิงสัมพันธ์ยอดนิยม', icon: <MySQLIcon />, link: 'https://www.mysql.com/' },
  { name: 'React-Router v7', description: 'ไลบรารีสำหรับการจัดการการนำทางในแอปพลิเคชัน React', icon: <ReactRouterIcon />, link: 'https://reactrouter.com/' },
  { name: 'Framer-Motion', description: 'ไลบรารีแอนิเมชันสำหรับ React ที่ใช้งานง่าย', icon: <FramerMotionIcon />, link: 'https://www.framer.com/motion/' },
  { name: 'Tailwind CSS', description: 'CSS Framework แบบ Utility-First สำหรับการสร้าง UI ที่รวดเร็ว', icon: <TailwindCssIcon />, link: 'https://tailwindcss.com/' },
  { name: 'Vite', description: 'เครื่องมือสำหรับสร้างโปรเจกต์และ Bundler ที่รวดเร็ว', icon: <ViteIcon />, link: 'https://vitejs.dev/' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Dashboard() {
    return (<>
        <Nav />
        <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
            <div className="container mx-auto max-w-6xl">
                <h1 className="text-4xl md:text-5xl font-extrabold text-center mt-20 mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
                    ภาพรวม Framework
                </h1>
                <p className="text-center text-gray-400 mb-16 text-lg">
                    ภาพรวมของเทคโนโลยีและเครื่องมือต่างๆ ที่ใช้ในโปรเจกต์
                </p>
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                    variants={{
                        visible: { transition: { staggerChildren: 0.07 } },
                    }}
                    initial="hidden"
                    animate="visible"
                >
                    {frameworks.map((fw, index) => (
                        <motion.a
                            key={index}
                            href={fw.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block"
                            variants={cardVariants}
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                        >
                            {/* ✨ 2. การ์ดที่ใช้ flex-col และ h-full เพื่อให้สูงเท่ากัน */}
                            <div className="h-full flex flex-col items-center bg-gray-800/50 p-6 rounded-2xl shadow-lg hover:bg-gray-800 transition-colors duration-300 border border-gray-700/80">
                                
                                {/* ✨ 3. กรอบวงกลมสำหรับ SVG */}
                                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-700/50 border border-slate-600 mb-6">
                                    {fw.icon}
                                </div>

                                <h2 className="text-xl font-bold text-white mb-2 text-center">
                                    {fw.name}
                                </h2>
                                <p className="text-sm text-gray-400 text-center">
                                    {fw.description}
                                </p>
                            </div>
                        </motion.a>
                    ))}
                </motion.div>
            </div>
        </div>
    </>);
}
`;
const sHome = UNSAFE_withComponentProps(function HomeDashboard() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-900 text-white p-8 font-sans",
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsxs("div", {
      className: "container mx-auto max-w-4xl pt-20",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text",
        children: "Home Dashboard"
      }), /* @__PURE__ */ jsx("p", {
        className: "text-center text-gray-400 mb-10 text-lg",
        children: "โค้ดสำหรับสร้างหน้า Dashboard ที่แสดงภาพรวมของเทคโนโลยีที่ใช้ในโปรเจกต์"
      }), /* @__PURE__ */ jsxs(motion.div, {
        className: "p-6 rounded-xl border-t-4 border-b-4 border-purple-500",
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5
        },
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold mb-4 text-white",
          children: "โครงสร้างและ Component"
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-gray-400 mb-4",
          children: ["ไฟล์นี้ประกอบด้วยการตั้งค่าเมตา, คอมโพเนนต์ไอคอน SVG, และส่วนแสดงผลที่ใช้", " ", /* @__PURE__ */ jsx("code", {
            className: "text-sm font-mono text-yellow-300 bg-yellow-400/10 px-1 py-0.5 rounded",
            children: "framer-motion"
          }), " ", "เพื่อสร้างการ์ดที่มีแอนิเมชันสวยงาม"]
        }), /* @__PURE__ */ jsx(CodeBlock, {
          code: homeCode.trim(),
          language: "tsx"
        })]
      })]
    }), /* @__PURE__ */ jsx(Footer, {})]
  });
});
const route14 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sHome,
  meta: meta$7
}, Symbol.toStringTag, { value: "Module" }));
function meta$6({}) {
  return [{
    title: "Code: PositionPage"
  }, {
    name: "description",
    content: "Complete source code for PositionPage.tsx"
  }];
}
const positionCode = `
// Position.tsx

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "~/components/Nav";
import type { Route } from "../+types/root";

// --- Meta ---
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Positions" },
    { name: "description", content: "Position Management Page" },
  ];
}

// --- Interfaces ---
// โครงสร้างข้อมูลของ Position
interface Position {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
// โครงสร้างข้อมูลสำหรับ State ของฟอร์ม
interface FormState {
  id: number | null;
  name: string;
}

// --- Constants ---
const API_BASE_URL = "http://localhost:5000";

// --- Animation Variants ---
// Transition แบบ "เด้ง" สำหรับใช้กับปุ่มต่างๆ
const bouncyTransition = {
  type: 'spring',
  stiffness: 500,
  damping: 10,
};

// Animation สำหรับ Modal
const modalVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { ...bouncyTransition, duration: 0.2 } },
  exit: { y: -50, opacity: 0, transition: { duration: 0.2 } },
};

// Animation สำหรับพื้นหลังของ Modal
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

// Animation สำหรับ Popup แจ้งเตือน
const statusMessageVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100, transition: { duration: 0.2 } },
};

// --- Main Component ---
export default function PositionPage() {
  // --- State Management ---
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [currentPosition, setCurrentPosition] = useState<FormState>({ id: null, name: "" });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // --- Functions ---

  // ฟังก์ชันแสดง Popup แจ้งเตือนและซ่อนหลังจากเวลาที่กำหนด
  const showStatusMessage = (type: "success" | "error", message: string) => {
    setStatusMessage({ type, message });
    setTimeout(() => setStatusMessage(null), 3500);
  };

  // ฟังก์ชันดึงข้อมูลตำแหน่งจาก API
  const fetchPositions = async () => {
    setLoading(true);
    try {
      const response = await fetch(\`\${API_BASE_URL}/positions\`);
      const result = await response.json();
      if (result.success) {
        setPositions(result.data);
      } else {
        showStatusMessage("error", "Failed to fetch positions.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      showStatusMessage("error", "Error fetching data from server.");
    } finally {
      setLoading(false);
    }
  };

  // เรียก fetchPositions เมื่อ Component ถูก Mount
  useEffect(() => {
    fetchPositions();
  }, []);

  // ฟังก์ชันจัดการการ Submit ฟอร์ม (สร้างและแก้ไข)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEditing ? \`\${API_BASE_URL}/positions/\${currentPosition.id}\` : \`\${API_BASE_URL}/positions\`;
    const method = isEditing ? "PUT" : "POST";
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: currentPosition.name }),
      });
      const result = await response.json();
      if (result.success) {
        showStatusMessage("success", \`Position \${isEditing ? "updated" : "created"}: "\${currentPosition.name}"\`);
        fetchPositions();
        setIsModalOpen(false);
      } else {
        showStatusMessage("error", \`Failed to \${isEditing ? "update" : "create"} position.\`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      showStatusMessage("error", "Error connecting to the server.");
    }
  };

  // ฟังก์ชันจัดการการลบข้อมูล
  const handleDelete = async () => {
    if (currentPosition.id === null) return;
    try {
      const response = await fetch(\`\${API_BASE_URL}/positions/\${currentPosition.id}\`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result.success) {
        showStatusMessage("success", \`Position deleted: "\${currentPosition.name}"\`);
        fetchPositions();
        setIsDeleteModalOpen(false);
      } else {
        showStatusMessage("error", "Failed to delete position.");
      }
    } catch (error) {
      console.error("Deletion error:", error);
      showStatusMessage("error", "Error connecting to the server.");
    }
  };

  // --- UI Event Handlers ---
  const handleCreateClick = () => {
    setIsEditing(false);
    setCurrentPosition({ id: null, name: "" });
    setIsModalOpen(true);
  };
  const handleEditClick = (position: Position) => {
    setIsEditing(true);
    setCurrentPosition({ id: position.id, name: position.name });
    setIsModalOpen(true);
  };
  const handleDeleteClick = (position: Position) => {
    setCurrentPosition({ id: position.id, name: position.name });
    setIsDeleteModalOpen(true);
  };
  const handleCloseModals = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  // --- Render Functions ---

  // ฟังก์ชัน Render ตารางข้อมูล
  const renderTable = () => (
    <motion.div
      className="bg-gray-800/50 shadow-lg rounded-xl overflow-hidden border border-gray-700/80"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800">
          <tr>
            {["ID", "Name", "Created At", "Updated At", "Actions"].map((header) => (
              <th key={header} scope="col" className={\`px-6 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider \${header === 'Actions' ? 'text-center' : 'text-left'}\`}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <motion.tbody
          className="bg-gray-900/10 divide-y divide-gray-700"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          initial="hidden"
          animate="visible"
        >
          {positions.map((position) => (
            <motion.tr
              key={position.id}
              className="hover:bg-gray-800/60 transition-colors duration-150"
              variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">{position.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{position.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{new Date(position.created_at).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{new Date(position.updated_at).toLocaleDateString()}</td>
              <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                <motion.button
                  onClick={() => handleEditClick(position)}
                  className="px-3 py-1 text-xs font-semibold text-indigo-300 bg-indigo-500/10 rounded-full hover:bg-indigo-500/20 transition-colors"
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={bouncyTransition}
                >Edit</motion.button>
                <motion.button
                  onClick={() => handleDeleteClick(position)}
                  className="px-3 py-1 text-xs font-semibold text-red-400 bg-red-500/10 rounded-full hover:bg-red-500/20 transition-colors"
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={bouncyTransition}
                >Delete</motion.button>
              </td>
            </motion.tr>
          ))}
        </motion.tbody>
      </table>
    </motion.div>
  );

  // ฟังก์ชัน reusable สำหรับห่อหุ้ม Modal ทั้งหมด
  const renderModalWrapper = (isOpen: boolean, children: React.ReactNode) => (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          variants={backdropVariants}
          initial="hidden" animate="visible" exit="exit"
          onClick={handleCloseModals}
        >
          <motion.div
            className="w-full max-w-md bg-slate-900/70 backdrop-blur-xl rounded-xl shadow-lg p-8 border border-slate-700"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // --- Main Render ---
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <Nav />
      {/* ส่วนของ Popup แจ้งเตือน */}
      <div className="fixed top-5 left-1-2 -translate-x-1/2 z-[100]">
        <AnimatePresence>
          {statusMessage && (
            <motion.div
              className={\`flex items-center gap-3 mb-4 px-5 py-3 rounded-xl text-white font-semibold shadow-lg \${statusMessage.type === "success" ? "bg-green-500/90" : "bg-red-500/90"} backdrop-blur-sm border border-white/20\`}
              variants={statusMessageVariants} initial="hidden" animate="visible" exit="exit"
            >
              <span className="text-lg">{statusMessage.type === 'success' ? '✓' : '✗'}</span>
              {statusMessage.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <main className="p-8 pt-24">
        <div className="max-w-7xl mx-auto">
          {/* ส่วนหัวและปุ่ม Add New */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
              Position Management
            </h1>
            <motion.button
              onClick={handleCreateClick}
              className="px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg shadow-blue-500/30 transition-all"
              whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }} transition={bouncyTransition}
            >+ Add New Position</motion.button>
          </div>

          {/* แสดงผลตามสถานะ: Loading, No Data, หรือ Table */}
          {loading ? (
            <div className="flex justify-center items-center h-64"><p className="text-xl text-gray-500">Loading...</p></div>
          ) : positions.length === 0 ? (
            <div className="flex justify-center items-center h-64 bg-gray-800/40 rounded-xl"><p className="text-xl text-gray-500">No positions found.</p></div>
          ) : (
            renderTable()
          )}
        </div>
      </main>

      {/* เรียกใช้ Modal */}
      {renderModalWrapper(isModalOpen, (
        <>
          <h2 className="text-2xl font-bold mb-6 text-gray-100">{isEditing ? "Edit Position" : "Create New Position"}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-400 font-semibold mb-2">Position Name</label>
              <input
                type="text"
                id="name"
                value={currentPosition.name}
                onChange={(e) => setCurrentPosition({ ...currentPosition, name: e.target.value })}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                required
              />
            </div>
            <div className="flex justify-end space-x-4">
              <motion.button type="button" onClick={handleCloseModals} className="px-6 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={bouncyTransition}>Cancel</motion.button>
              <motion.button type="submit" className="px-6 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={bouncyTransition}>{isEditing ? "Save Changes" : "Create"}</motion.button>
            </div>
          </form>
        </>
      ))}

      {renderModalWrapper(isDeleteModalOpen, (
        <>
          <h2 className="text-2xl font-bold mb-4 text-red-500">Confirm Deletion</h2>
          <p className="text-gray-300 mb-6">Are you sure you want to delete position: <strong className="text-white">{currentPosition.name}</strong>?</p>
          <div className="flex justify-end space-x-4">
            <motion.button onClick={handleCloseModals} className="px-6 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={bouncyTransition}>Cancel</motion.button>
            <motion.button onClick={handleDelete} className="px-6 py-2 rounded-md text-white bg-red-600 hover:bg-red-700" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={bouncyTransition}>Delete</motion.button>
          </div>
        </>
      ))}
    </div>
  );
}
`;
const sPosition = UNSAFE_withComponentProps(function PositionCodePage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-900 text-white p-8 font-sans",
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsxs("div", {
      className: "container mx-auto max-w-4xl pt-20",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text",
        children: "Position.tsx"
      }), /* @__PURE__ */ jsx("p", {
        className: "text-center text-gray-400 mb-10 text-lg",
        children: "ไฟล์ Component หลักสำหรับหน้าจัดการข้อมูลตำแหน่ง (Position Management) ซึ่งเป็นหน้า CRUD (Create, Read, Update, Delete) พื้นฐาน"
      }), /* @__PURE__ */ jsxs(motion.div, {
        className: "p-6 rounded-xl border-t-4 border-b-4 border-purple-500",
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5
        },
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold mb-4 text-white",
          children: "ฟีเจอร์และส่วนประกอบหลัก"
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-gray-400 mb-4",
          children: ["โค้ดนี้แสดงการจัดการข้อมูลในรูปแบบตาราง (Table) โดยใช้", " ", /* @__PURE__ */ jsx("code", {
            className: "text-sm font-mono text-pink-400",
            children: "framer-motion"
          }), " ", "เพื่อเพิ่ม animation ทำให้แถวในตารางทยอยปรากฏขึ้นอย่างสวยงาม"]
        }), /* @__PURE__ */ jsxs("ul", {
          className: "text-gray-400 mb-6 space-y-2 list-disc list-inside",
          children: [/* @__PURE__ */ jsxs("li", {
            children: [/* @__PURE__ */ jsx("strong", {
              className: "text-white",
              children: "Animated Table:"
            }), " ใช้", " ", /* @__PURE__ */ jsx("code", {
              className: "text-sm font-mono text-yellow-300",
              children: "staggerChildren"
            }), " ", "เพื่อให้แถวข้อมูล (rows) ในตารางทยอยแสดงผล"]
          }), /* @__PURE__ */ jsxs("li", {
            children: [/* @__PURE__ */ jsx("strong", {
              className: "text-white",
              children: "Glassmorphism Modals:"
            }), " ", 'หน้าต่าง Popup สำหรับสร้าง, แก้ไข, และลบข้อมูล มีลักษณะโปร่งใสและมี animation ที่ "เด้ง" ตอบสนองต่อผู้ใช้']
          }), /* @__PURE__ */ jsxs("li", {
            children: [/* @__PURE__ */ jsx("strong", {
              className: "text-white",
              children: "Bouncy Buttons:"
            }), " ", "ปุ่มทั้งหมดในหน้านี้ ทั้งปุ่มหลักและปุ่ม Action ในตาราง มีการตอบสนองที่สนุกสนานเมื่อใช้งาน"]
          }), /* @__PURE__ */ jsxs("li", {
            children: [/* @__PURE__ */ jsx("strong", {
              className: "text-white",
              children: "Dynamic Notifications:"
            }), " Popup แจ้งเตือนจะแสดงข้อความที่เฉพาะเจาะจงตาม Action ที่ทำสำเร็จ เช่น บอกชื่อตำแหน่งที่เพิ่งสร้างหรือลบไป"]
          })]
        }), /* @__PURE__ */ jsx(CodeBlock, {
          code: positionCode,
          language: "tsx"
        })]
      }), /* @__PURE__ */ jsx(Footer, {})]
    })]
  });
});
const route15 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sPosition,
  meta: meta$6
}, Symbol.toStringTag, { value: "Module" }));
function meta$5({}) {
  return [{
    title: "Code: TeacherPage"
  }, {
    name: "description",
    content: "Complete source code for TeacherPage.tsx"
  }];
}
const teacherCode = `
// Teacher.tsx

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "~/components/Nav";
import type { Route } from "../+types/root";
import CustomSelect from "~/components/CustomSelect"; // ตรวจสอบว่า path ถูกต้อง

// --- Interfaces ---
interface Teacher {
  id: number;
  name: string;
  address: string;
  telephone: string;
  img: string;
  position_id: number;
  created_at: string;
  updated_at: string;
}

interface Position {
  id: number;
  name: string;
}

interface TeacherFormData {
  name: string;
  address: string;
  telephone: string;
  imgFile: File | null;
  position_id: number;
}

// --- Meta and Constants ---
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Teachers" },
    { name: "description", content: "Teacher Management Page" },
  ];
}

const API_BASE_URL = "http://localhost:5000";

// --- Animation Variants ---
const bouncyTransition = {
  type: 'spring',
  stiffness: 500,
  damping: 10,
};

const modalVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { ...bouncyTransition, duration: 0.2 } },
  exit: { y: -50, opacity: 0, transition: { duration: 0.2 } },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const statusMessageVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -100, transition: { duration: 0.2 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// --- Main Component ---
export default function TeacherPage() {
  // --- State Management ---
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentTeacher, setCurrentTeacher] = useState<Teacher | null>(null);
  const [selectedTeacherForDetail, setSelectedTeacherForDetail] = useState<Teacher | null>(null);
  const [formData, setFormData] = useState<TeacherFormData>({
    name: "",
    address: "",
    telephone: "",
    imgFile: null,
    position_id: 0,
  });
  const [imgPreview, setImgPreview] = useState<string>(\`\${API_BASE_URL}/uploads/default.svg\`);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; message: string } | null>(null);
  
  // --- Functions ---
  const showStatusMessage = (type: "success" | "error", message: string) => {
    setStatusMessage({ type, message });
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const response = await fetch(\`\${API_BASE_URL}/teachers\`);
      const result = await response.json();
      if (result.success) setTeachers(result.data);
      else showStatusMessage("error", "Failed to fetch teachers.");
    } catch (error) {
      console.error("Fetch error:", error);
      showStatusMessage("error", "Error fetching data from server.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPositions = async () => {
    try {
      const response = await fetch(\`\${API_BASE_URL}/positions\`);
      const result = await response.json();
      if (result.success) setPositions(result.data);
    } catch (error) {
      console.error("Fetch positions error:", error);
    }
  };
  
  useEffect(() => {
    fetchTeachers();
    fetchPositions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.position_id === 0) {
        showStatusMessage("error", "Please select a position.");
        return;
    }

    const url = isEditing ? \`\${API_BASE_URL}/teachers/\${currentTeacher?.id}\` : \`\${API_BASE_URL}/teachers\`;
    const method = isEditing ? "PUT" : "POST";
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", formData.name);
    formDataToSubmit.append("address", formData.address);
    formDataToSubmit.append("telephone", formData.telephone);
    formDataToSubmit.append("position_id", formData.position_id.toString());
    if (formData.imgFile) formDataToSubmit.append("img", formData.imgFile);

    try {
      const response = await fetch(url, { method, body: formDataToSubmit });
      const result = await response.json();
      if (result.success) {
        showStatusMessage("success", \`Teacher \${isEditing ? "updated" : "created"}: "\${formData.name}"\`);
        fetchTeachers();
        handleCloseModals();
      } else {
        showStatusMessage("error", \`Failed: \${result.message || 'Unknown error'}\`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      showStatusMessage("error", "Error connecting to the server.");
    }
  };
  
  const handleDelete = async () => {
    if (!currentTeacher) return;
    try {
      const response = await fetch(\`\${API_BASE_URL}/teachers/\${currentTeacher.id}\`, { method: "DELETE" });
      const result = await response.json();
      if (result.success) {
        showStatusMessage("success", \`Teacher deleted: "\${currentTeacher.name}"\`);
        fetchTeachers();
        handleCloseModals();
      } else {
        showStatusMessage("error", "Failed to delete teacher.");
      }
    } catch (error) {
      console.error("Deletion error:", error);
      showStatusMessage("error", "Error connecting to the server.");
    }
  };

  const handleCreateClick = () => {
    setIsEditing(false);
    setCurrentTeacher(null);
    setFormData({ name: "", address: "", telephone: "", imgFile: null, position_id: 0 });
    setImgPreview(\`\${API_BASE_URL}/uploads/default.svg\`);
    setIsModalOpen(true);
  };
  const handleEditClick = (teacher: Teacher) => {
    setIsEditing(true);
    setCurrentTeacher(teacher);
    setFormData({
      name: teacher.name,
      address: teacher.address,
      telephone: teacher.telephone,
      imgFile: null,
      position_id: teacher.position_id,
    });
    setImgPreview(teacher.img ? \`\${API_BASE_URL}\${teacher.img}\` : \`\${API_BASE_URL}/uploads/default.svg\`);
    setIsModalOpen(true);
  };
  const handleDeleteClick = (teacher: Teacher) => {
    setCurrentTeacher(teacher);
    setIsDeleteModalOpen(true);
  };
  const handleShowDetailClick = (teacher: Teacher) => {
    setSelectedTeacherForDetail(teacher);
    setIsDetailModalOpen(true);
  };
  const handleCloseModals = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
    setIsDetailModalOpen(false);
  };
  
  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, imgFile: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImgPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImgPreview(currentTeacher?.img ? \`\${API_BASE_URL}\${currentTeacher.img}\` : \`\${API_BASE_URL}/uploads/default.svg\`);
    }
  };

  const renderCards = () => (
    <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" variants={{ visible: { transition: { staggerChildren: 0.07 } } }} initial="hidden" animate="visible">
      {teachers.map((teacher) => (
        <motion.div key={teacher.id} className="bg-gray-800/50 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border border-gray-700/80" variants={cardVariants} whileHover={{ scale: 1.03, y: -5 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
          <img src={teacher.img ? \`\${API_BASE_URL}\${teacher.img}\` : \`\${API_BASE_URL}/uploads/default.svg\`} alt={teacher.name} className="w-32 h-32 rounded-full object-cover border-4 border-teal-500/50 mb-4" />
          <h3 className="text-xl font-bold text-gray-100 mb-1">{teacher.name}</h3>
          <p className="text-sm text-teal-400 mb-4">{positions.find((pos) => pos.id === teacher.position_id)?.name || "N/A"}</p>
          <div className="flex flex-wrap justify-center gap-2 mt-auto pt-4">
            <motion.button onClick={() => handleShowDetailClick(teacher)} className="px-3 py-1 text-xs font-semibold text-sky-300 bg-sky-500/10 rounded-full hover:bg-sky-500/20 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={bouncyTransition}>Details</motion.button>
            <motion.button onClick={() => handleEditClick(teacher)} className="px-3 py-1 text-xs font-semibold text-indigo-300 bg-indigo-500/10 rounded-full hover:bg-indigo-500/20 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={bouncyTransition}>Edit</motion.button>
            <motion.button onClick={() => handleDeleteClick(teacher)} className="px-3 py-1 text-xs font-semibold text-red-400 bg-red-500/10 rounded-full hover:bg-red-500/20 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={bouncyTransition}>Delete</motion.button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
  
  const renderModalWrapper = (isOpen: boolean, children: React.ReactNode) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                variants={backdropVariants}
                initial="hidden" animate="visible" exit="exit"
                onClick={handleCloseModals}
            >
                <motion.div
                    className="w-full max-w-lg bg-slate-900/70 backdrop-blur-xl rounded-xl shadow-lg p-8 border border-slate-700 max-h-[90vh] overflow-y-auto"
                    variants={modalVariants}
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <Nav />
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100]">
        <AnimatePresence>
          {statusMessage && (
            <motion.div
              className={\`flex items-center gap-3 mb-4 px-5 py-3 rounded-xl text-white font-semibold shadow-lg \${statusMessage.type === "success" ? "bg-green-500/90" : "bg-red-500/90"} backdrop-blur-sm border border-white/20\`}
              variants={statusMessageVariants} initial="hidden" animate="visible" exit="exit"
            >
              <span className="text-lg">{statusMessage.type === 'success' ? '✓' : '✗'}</span>
              {statusMessage.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <main className="p-8 pt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-teal-400 via-cyan-500 to-sky-600 text-transparent bg-clip-text">Teacher Management</h1>
            <motion.button
              onClick={handleCreateClick}
              className="px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full shadow-lg shadow-cyan-500/30 transition-all"
              whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}
              transition={bouncyTransition}
            >+ Add New Teacher</motion.button>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64"><p className="text-xl text-gray-500">Loading...</p></div>
          ) : teachers.length === 0 ? (
            <div className="flex justify-center items-center h-64 bg-gray-800/40 rounded-xl"><p className="text-xl text-gray-500">No teachers found.</p></div>
          ) : (
            renderCards()
          )}
        </div>
      </main>
      
      {renderModalWrapper(isModalOpen, (
        <>
            <h2 className="text-2xl font-bold mb-6 text-gray-100 text-center">{isEditing ? "Edit Teacher" : "Create New Teacher"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col items-center space-y-3">
                    <motion.img src={imgPreview} alt="Preview" className="h-24 w-24 rounded-full object-cover border-4 border-gray-600" whileHover={{ scale: 1.05, rotate: 2 }} transition={bouncyTransition} />
                    <input type="file" id="img" name="img" onChange={handleImgChange} className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" accept="image/*" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-400 font-semibold mb-2 text-sm">Name</label>
                        <input type="text" id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                    </div>
                    <div>
                        <label htmlFor="telephone" className="block text-gray-400 font-semibold mb-2 text-sm">Telephone</label>
                        <input type="text" id="telephone" value={formData.telephone} onChange={(e) => setFormData({ ...formData, telephone: e.target.value })} className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500" required />
                    </div>
                </div>
                <div>
                    <label htmlFor="address" className="block text-gray-400 font-semibold mb-2 text-sm">Address</label>
                    <textarea id="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 h-20" required />
                </div>
                <div>
                    <label className="block text-gray-400 font-semibold mb-2 text-sm">Position</label>
                    <CustomSelect
                        options={positions}
                        value={formData.position_id}
                        onChange={(id) => setFormData({ ...formData, position_id: id })}
                        placeholder="Select a position"
                    />
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                    <motion.button type="button" onClick={handleCloseModals} className="px-6 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={bouncyTransition}>Cancel</motion.button>
                    <motion.button type="submit" className="px-6 py-2 rounded-md text-white bg-cyan-600 hover:bg-cyan-700" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={bouncyTransition}>{isEditing ? "Save Changes" : "Create"}</motion.button>
                </div>
            </form>
        </>
      ))}

      {renderModalWrapper(isDeleteModalOpen, (
        <>
            <h2 className="text-2xl font-bold mb-4 text-red-500">Confirm Deletion</h2>
            <p className="text-gray-300 mb-6">Are you sure you want to delete teacher: <strong className="text-white">{currentTeacher?.name}</strong>?</p>
            <div className="flex justify-end space-x-4">
                <motion.button onClick={handleCloseModals} className="px-6 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-700" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={bouncyTransition}>Cancel</motion.button>
                <motion.button onClick={handleDelete} className="px-6 py-2 rounded-md text-white bg-red-600 hover:bg-red-700" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={bouncyTransition}>Delete</motion.button>
            </div>
        </>
      ))}

      {renderModalWrapper(isDetailModalOpen, (
        <>
            {selectedTeacherForDetail && (
                <div className="flex flex-col items-center text-gray-300">
                    <h2 className="text-2xl font-bold mb-4 text-gray-100">Teacher Details</h2>
                    <motion.img src={selectedTeacherForDetail.img ? \`\${API_BASE_URL}\${selectedTeacherForDetail.img}\` : \`\${API_BASE_URL}/uploads/default.svg\`} alt={selectedTeacherForDetail.name} className="w-40 h-40 rounded-full object-cover border-4 border-teal-500/80 mb-6" whileHover={{ scale: 1.05, rotate: -2 }} transition={bouncyTransition}/>
                    <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-white mb-1">{selectedTeacherForDetail.name}</h3>
                        <p className="text-teal-400">{positions.find((pos) => pos.id === selectedTeacherForDetail.position_id)?.name || "N/A"}</p>
                    </div>
                    <div className="w-full text-left space-y-3 p-4 bg-gray-800/50 rounded-lg">
                        <p><strong className="font-semibold text-gray-400 w-24 inline-block">Address:</strong> {selectedTeacherForDetail.address}</p>
                        <p><strong className="font-semibold text-gray-400 w-24 inline-block">Telephone:</strong> {selectedTeacherForDetail.telephone}</p>
                    </div>
                    <motion.button onClick={handleCloseModals} className="mt-6 px-6 py-2 rounded-md text-white bg-cyan-600 hover:bg-cyan-700" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={bouncyTransition}>Close</motion.button>
                </div>
            )}
        </>
      ))}
    </div>
  );
}
`;
const sTeacher = UNSAFE_withComponentProps(function TeacherCodePage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-900 text-white p-8 font-sans",
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsxs("div", {
      className: "container mx-auto max-w-4xl pt-20",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-teal-400 via-cyan-500 to-sky-600 text-transparent bg-clip-text",
        children: "Teacher.tsx"
      }), /* @__PURE__ */ jsx("p", {
        className: "text-center text-gray-400 mb-10 text-lg",
        children: "ไฟล์ Component หลักสำหรับหน้าจัดการข้อมูลบุคลากร (Teacher Management)"
      }), /* @__PURE__ */ jsxs(motion.div, {
        className: "p-6 rounded-xl border-t-4 border-b-4 border-cyan-500",
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5
        },
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold mb-4 text-white",
          children: "ฟีเจอร์และส่วนประกอบหลัก"
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-gray-400 mb-4",
          children: ["โค้ดนี้จัดการทุกอย่างตั้งแต่การดึงข้อมูลจาก API, การแสดงผล, ไปจนถึงการสร้าง, แก้ไข, และลบข้อมูล โดยใช้", " ", /* @__PURE__ */ jsx("code", {
            className: "text-sm font-mono text-pink-400",
            children: "framer-motion"
          }), " ", "เพื่อเพิ่ม animation ให้กับ UI"]
        }), /* @__PURE__ */ jsxs("ul", {
          className: "text-gray-400 mb-6 space-y-2 list-disc list-inside",
          children: [/* @__PURE__ */ jsxs("li", {
            children: [/* @__PURE__ */ jsx("strong", {
              className: "text-white",
              children: "State Management:"
            }), " ใช้", " ", /* @__PURE__ */ jsx("code", {
              className: "text-sm font-mono text-yellow-300",
              children: "useState"
            }), " ", "และ", " ", /* @__PURE__ */ jsx("code", {
              className: "text-sm font-mono text-yellow-300",
              children: "useEffect"
            }), " ", "ในการจัดการข้อมูลและสถานะต่างๆ ของหน้า"]
          }), /* @__PURE__ */ jsxs("li", {
            children: [/* @__PURE__ */ jsx("strong", {
              className: "text-white",
              children: "CRUD Operations:"
            }), " ", "ฟังก์ชันสำหรับ", " ", /* @__PURE__ */ jsx("code", {
              className: "text-sm font-mono text-pink-400",
              children: "Create"
            }), ",", " ", /* @__PURE__ */ jsx("code", {
              className: "text-sm font-mono text-pink-400",
              children: "Read"
            }), ",", " ", /* @__PURE__ */ jsx("code", {
              className: "text-sm font-mono text-pink-400",
              children: "Update"
            }), ", และ", " ", /* @__PURE__ */ jsx("code", {
              className: "text-sm font-mono text-pink-400",
              children: "Delete"
            }), " ", "ข้อมูลผ่าน API"]
          }), /* @__PURE__ */ jsxs("li", {
            children: [/* @__PURE__ */ jsx("strong", {
              className: "text-white",
              children: "Animated UI:"
            }), " แสดงผลข้อมูลในรูปแบบการ์ดที่ Animate ทยอยขึ้นมา และมี Modal แบบโปร่งใส (Glassmorphism) ที่เคลื่อนไหวอย่างสวยงาม"]
          }), /* @__PURE__ */ jsxs("li", {
            children: [/* @__PURE__ */ jsx("strong", {
              className: "text-white",
              children: "Custom Components:"
            }), " ", "เรียกใช้งาน", " ", /* @__PURE__ */ jsx("code", {
              className: "text-sm font-mono text-yellow-300",
              children: "CustomSelect"
            }), " ", "เพื่อประสบการณ์ใช้งานที่ดีกว่า Select box แบบเดิม"]
          }), /* @__PURE__ */ jsxs("li", {
            children: [/* @__PURE__ */ jsx("strong", {
              className: "text-white",
              children: "User Feedback:"
            }), " มี Popup แจ้งเตือน (Notification) ที่เลื่อนลงมาจากด้านบนเพื่อแจ้งผลการทำงานต่างๆ"]
          })]
        }), /* @__PURE__ */ jsx(CodeBlock, {
          code: teacherCode,
          language: "tsx"
        })]
      }), /* @__PURE__ */ jsx(Footer, {})]
    })]
  });
});
const route16 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sTeacher,
  meta: meta$5
}, Symbol.toStringTag, { value: "Module" }));
function meta$4({}) {
  return [{
    title: "Code: CustomSelect"
  }, {
    name: "description",
    content: "Complete source code for CustomSelect.tsx"
  }];
}
const customSelectCode = `
// CustomSelect.tsx

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Interface กำหนดโครงสร้างของข้อมูลแต่ละตัวเลือก
interface Option {
  id: number;
  name: string;
}

// Interface กำหนด Props ที่ Component นี้จะรับเข้ามา
interface CustomSelectProps {
  options: Option[];         // รายการตัวเลือกทั้งหมด
  value: number;             // ค่า (id) ของตัวเลือกที่ถูกเลือกอยู่
  onChange: (value: number) => void; // ฟังก์ชันที่จะทำงานเมื่อมีการเลือก option ใหม่
  placeholder: string;       // ข้อความที่จะแสดงเมื่อยังไม่มีการเลือก
}

// --- Animation Variants ---

// Animation สำหรับกล่องรายการตัวเลือก (ul)
const listVariants = {
  hidden: { opacity: 0, height: 0 }, // สถานะเริ่มต้น: ซ่อนและไม่มีความสูง
  visible: { 
    opacity: 1, 
    height: 'auto', // สถานะแสดงผล: แสดงและปรับความสูงอัตโนมัติ
    transition: {
      when: "beforeChildren",      // ให้ animation ของแม่เสร็จก่อน
      staggerChildren: 0.05,     // ให้ animation ของลูกๆ (li) ทยอยแสดงผลห่างกัน 0.05 วินาที
    }
  },
  exit: { opacity: 0, height: 0 }, // สถานะตอนหายไป: ซ่อนและไม่มีความสูง
};

// Animation สำหรับแต่ละรายการ (li)
const itemVariants = {
  hidden: { opacity: 0, y: 10 }, // สถานะเริ่มต้น: ซ่อนและอยู่ต่ำกว่าตำแหน่งจริง 10px (เพื่อสไลด์ขึ้น)
  visible: { opacity: 1, y: 0 }, // สถานะแสดงผล: แสดงผลที่ตำแหน่งจริง
};


export default function CustomSelect({ options, value, onChange, placeholder }: CustomSelectProps) {
  // State สำหรับตรวจสอบว่ากล่องตัวเลือกกำลังเปิดอยู่หรือไม่
  const [isOpen, setIsOpen] = useState(false);
  
  // ค้นหาข้อมูลของ option ที่ถูกเลือกจาก id ที่รับมาใน value
  const selectedOption = options.find(opt => opt.id === value);

  // ฟังก์ชันที่จะทำงานเมื่อคลิกเลือก option
  const handleSelect = (optionId: number) => {
    onChange(optionId); // เรียกฟังก์ชัน onChange ที่ส่งมาจาก Parent พร้อมกับ id ของ option ใหม่
    setIsOpen(false);   // ปิดกล่องตัวเลือก
  };

  return (
    <div className="relative w-full">
      {/* ปุ่มหลักที่ใช้แสดงค่าที่เลือกและใช้เปิด/ปิดกล่องตัวเลือก */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-left bg-gray-800/50 border border-gray-700 rounded-md flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-cyan-500"
      >
        <span className={selectedOption ? 'text-white' : 'text-gray-400'}>
          {selectedOption ? selectedOption.name : placeholder}
        </span>
        {/* ไอคอนลูกศรที่หมุนตามสถานะ isOpen */}
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
        </motion.span>
      </button>

      {/* AnimatePresence ใช้เพื่อจัดการ animation ตอนที่ component หายไป */}
      <AnimatePresence>
        {isOpen && (
          // กล่องรายการตัวเลือก (ul)
          <motion.ul
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            // CSS Classes: ทำให้เปิดขึ้นด้านบน (bottom-full mb-2), มี scrollbar เมื่อข้อมูลเยอะ (max-h-60 overflow-y-auto)
            className="absolute z-10 w-full bottom-full mb-2 bg-slate-800 border border-slate-700 rounded-md shadow-lg overflow-hidden max-h-60 overflow-y-auto"
          >
            {/* วนลูปแสดงรายการตัวเลือกแต่ละอัน */}
            {options.map(option => (
              <motion.li
                key={option.id}
                variants={itemVariants}
                onClick={() => handleSelect(option.id)}
                className="px-4 py-2 text-white hover:bg-cyan-600/50 cursor-pointer"
                whileHover={{ x: 5 }} // เพิ่ม animation ตอน hover
              >
                {option.name}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
`;
const sCustomSelect = UNSAFE_withComponentProps(function CustomSelectCodePage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-900 text-white p-8 font-sans",
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsxs("div", {
      className: "container mx-auto max-w-4xl pt-20",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-teal-400 via-cyan-500 to-sky-600 text-transparent bg-clip-text",
        children: "CustomSelect.tsx"
      }), /* @__PURE__ */ jsxs("p", {
        className: "text-center text-gray-400 mb-10 text-lg",
        children: ["Component ที่สร้างขึ้นมาเพื่อทดแทน", " ", /* @__PURE__ */ jsx("code", {
          className: "text-sm font-mono text-pink-400",
          children: "<select>"
        }), " ", "แบบดั้งเดิม ทำให้สามารถปรับแต่ง Style และเพิ่ม Animation ได้อย่างเต็มที่"]
      }), /* @__PURE__ */ jsxs(motion.div, {
        className: "p-6 rounded-xl border-t-4 border-b-4 border-cyan-500",
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5
        },
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold mb-4 text-white",
          children: "ฟีเจอร์และส่วนประกอบหลัก"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-gray-400 mb-4",
          children: "โค้ดนี้ถูกออกแบบมาให้เป็น Component ที่นำกลับมาใช้ใหม่ได้ (Reusable) โดยรับค่าต่างๆ ผ่าน Props ทำให้มีความยืดหยุ่นสูง"
        }), /* @__PURE__ */ jsxs("ul", {
          className: "text-gray-400 mb-6 space-y-2 list-disc list-inside",
          children: [/* @__PURE__ */ jsxs("li", {
            children: [/* @__PURE__ */ jsx("strong", {
              className: "text-white",
              children: "Fully Customizable:"
            }), " สร้างจาก", " ", /* @__PURE__ */ jsx("code", {
              className: "text-sm font-mono text-yellow-300",
              children: "div"
            }), " ", "และ", " ", /* @__PURE__ */ jsx("code", {
              className: "text-sm font-mono text-yellow-300",
              children: "button"
            }), " ", "ทำให้สามารถใช้ Tailwind CSS ปรับแต่งหน้าตาได้ทุกส่วน"]
          }), /* @__PURE__ */ jsxs("li", {
            children: [/* @__PURE__ */ jsx("strong", {
              className: "text-white",
              children: "Staggered Animation:"
            }), " ", "รายการตัวเลือกจะทยอยปรากฏขึ้นทีละรายการอย่างสวยงามโดยใช้", " ", /* @__PURE__ */ jsx("code", {
              className: "text-sm font-mono text-pink-400",
              children: "staggerChildren"
            })]
          }), /* @__PURE__ */ jsxs("li", {
            children: [/* @__PURE__ */ jsx("strong", {
              className: "text-white",
              children: "Upward Opening:"
            }), " ", "ถูกตั้งค่าให้เปิดรายการขึ้นด้านบน (", /* @__PURE__ */ jsx("code", {
              className: "text-sm font-mono text-yellow-300",
              children: "bottom-full"
            }), ") เพื่อป้องกันไม่ให้รายการล้นออกนอกหน้าจอ Modal"]
          }), /* @__PURE__ */ jsxs("li", {
            children: [/* @__PURE__ */ jsx("strong", {
              className: "text-white",
              children: "Auto Scrollbar:"
            }), " ", "เมื่อมีข้อมูลจำนวนมาก จะมีแถบเลื่อน (Scrollbar) ปรากฏขึ้นโดยอัตโนมัติ (", /* @__PURE__ */ jsx("code", {
              className: "text-sm font-mono text-yellow-300",
              children: "max-h-60 overflow-y-auto"
            }), ")"]
          })]
        }), /* @__PURE__ */ jsx(CodeBlock, {
          code: customSelectCode,
          language: "tsx"
        })]
      }), /* @__PURE__ */ jsx(Footer, {})]
    })]
  });
});
const route17 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sCustomSelect,
  meta: meta$4
}, Symbol.toStringTag, { value: "Module" }));
function meta$3({}) {
  return [{
    title: "React Router Routes"
  }, {
    name: "description",
    content: "Route configuration for the application using React Router v7."
  }];
}
const routesCode = `import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/teachers", "routes/teacher.tsx"),
    route("/positions", "routes/position.tsx")
] satisfies RouteConfig;`;
const sRoutes = UNSAFE_withComponentProps(function RoutesPage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-900 text-white p-8 font-sans",
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsxs("div", {
      className: "container mx-auto max-w-4xl pt-20",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text",
        children: "การตั้งค่าเส้นทาง (Routes)"
      }), /* @__PURE__ */ jsxs("p", {
        className: "text-center text-gray-400 mb-10 text-lg",
        children: ["โค้ดสำหรับไฟล์", " ", /* @__PURE__ */ jsx("code", {
          className: "text-sm font-mono text-pink-400",
          children: "s-routes.tsx"
        }), " ", "เพื่อกำหนดเส้นทางของหน้าต่างๆ ในแอปพลิเคชัน"]
      }), /* @__PURE__ */ jsxs(motion.div, {
        className: "p-6 rounded-xl border-t-4 border-b-4 border-purple-500",
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5
        },
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold mb-4 text-white",
          children: "รายละเอียดโค้ด"
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-gray-400 mb-4",
          children: ["โค้ดนี้ใช้ฟังก์ชัน", " ", /* @__PURE__ */ jsx("code", {
            className: "text-sm font-mono text-yellow-300",
            children: "index"
          }), " และ", " ", /* @__PURE__ */ jsx("code", {
            className: "text-sm font-mono text-yellow-300",
            children: "route"
          }), " ", "จากไลบรารีของ React Router v7 เพื่อสร้างออบเจกต์การตั้งค่าเส้นทาง"]
        }), /* @__PURE__ */ jsxs("ul", {
          className: "text-gray-400 mb-6 space-y-2 list-disc list-inside",
          children: [/* @__PURE__ */ jsxs("li", {
            children: [/* @__PURE__ */ jsx("code", {
              className: "text-sm font-mono text-yellow-300",
              children: 'index("routes/home.tsx")'
            }), ": กำหนดหน้าแรกของแอปพลิเคชันที่เส้นทางหลัก (", /* @__PURE__ */ jsx("code", {
              className: "text-sm font-mono text-pink-400",
              children: "/"
            }), ") โดยใช้คอมโพเนนต์จากไฟล์", " ", /* @__PURE__ */ jsx("code", {
              className: "text-sm font-mono text-pink-400",
              children: "home.tsx"
            })]
          }), /* @__PURE__ */ jsxs("li", {
            children: [/* @__PURE__ */ jsx("code", {
              className: "text-sm font-mono text-yellow-300",
              children: 'route("/teachers", "routes/teacher.tsx")'
            }), ': กำหนดเส้นทางสำหรับหน้า "Teachers" ที่ URL', " ", /* @__PURE__ */ jsx("code", {
              className: "text-sm font-mono text-pink-400",
              children: "/teachers"
            })]
          }), /* @__PURE__ */ jsxs("li", {
            children: [/* @__PURE__ */ jsx("code", {
              className: "text-sm font-mono text-yellow-300",
              children: 'route("/positions", "routes/position.tsx")'
            }), ': กำหนดเส้นทางสำหรับหน้า "Positions" ที่ URL', " ", /* @__PURE__ */ jsx("code", {
              className: "text-sm font-mono text-pink-400",
              children: "/positions"
            })]
          })]
        }), /* @__PURE__ */ jsx(CodeBlock, {
          code: routesCode,
          language: "tsx"
        })]
      }), /* @__PURE__ */ jsx(Footer, {})]
    })]
  });
});
const route18 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sRoutes,
  meta: meta$3
}, Symbol.toStringTag, { value: "Module" }));
function meta$2({}) {
  return [{
    title: "Create Database"
  }, {
    name: "description",
    content: "SQL code to create the demo-school database."
  }];
}
const sqlCode$2 = `CREATE DATABASE [demo-school];`;
const sCreateDatabase = UNSAFE_withComponentProps(function CreateDatabasePage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-900 text-white p-8 font-sans",
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsxs("div", {
      className: "container mx-auto max-w-4xl pt-20",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text",
        children: "สร้างฐานข้อมูล"
      }), /* @__PURE__ */ jsxs("p", {
        className: "text-center text-gray-400 mb-10 text-lg",
        children: ["คำสั่ง SQL สำหรับการสร้างฐานข้อมูล", " ", /* @__PURE__ */ jsx("code", {
          className: "text-sm font-mono text-pink-400",
          children: "demo-school"
        })]
      }), /* @__PURE__ */ jsxs(motion.div, {
        className: "p-6 rounded-xl border-t-4 border-b-4 border-purple-500",
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5
        },
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold mb-4 text-white",
          children: "คำสั่ง SQL"
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-gray-400 mb-4",
          children: ["คำสั่ง", " ", /* @__PURE__ */ jsx("code", {
            className: "text-sm font-mono text-yellow-300",
            children: "CREATE DATABASE"
          }), " ", "เป็นคำสั่งพื้นฐานใน SQL ที่ใช้เพื่อสร้างฐานข้อมูลใหม่"]
        }), /* @__PURE__ */ jsx(CodeBlock, {
          code: sqlCode$2,
          language: "sql"
        })]
      }), /* @__PURE__ */ jsx(Footer, {})]
    })]
  });
});
const route19 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sCreateDatabase,
  meta: meta$2
}, Symbol.toStringTag, { value: "Module" }));
function meta$1({}) {
  return [{
    title: "Create Tables"
  }, {
    name: "description",
    content: "SQL code to create 'positions' and 'teachers' tables."
  }];
}
const sqlCode$1 = `CREATE TABLE positions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    telephone VARCHAR(12),
    img VARCHAR(255),
    position_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_teacher_position FOREIGN KEY (position_id)
    REFERENCES positions(id) ON DELETE SET NULL ON UPDATE CASCADE
);`;
const sCreateTable = UNSAFE_withComponentProps(function CreateTablePage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-900 text-white p-8 font-sans",
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsxs("div", {
      className: "container mx-auto max-w-4xl pt-20",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text",
        children: "สร้างตาราง"
      }), /* @__PURE__ */ jsxs("p", {
        className: "text-center text-gray-400 mb-10 text-lg",
        children: ["คำสั่ง SQL สำหรับการสร้างตาราง", " ", /* @__PURE__ */ jsx("code", {
          className: "text-sm font-mono text-pink-400",
          children: "positions"
        }), " และ", " ", /* @__PURE__ */ jsx("code", {
          className: "text-sm font-mono text-pink-400",
          children: "teachers"
        }), " ", "ที่จำเป็นสำหรับแอปพลิเคชัน"]
      }), /* @__PURE__ */ jsxs(motion.div, {
        className: "p-6 rounded-xl border-t-4 border-b-4 border-purple-500",
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5
        },
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold mb-4 text-white",
          children: "คำสั่ง SQL"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-gray-400 mb-4",
          children: "โค้ดนี้สร้างสองตาราง:"
        }), /* @__PURE__ */ jsxs("ul", {
          className: "text-gray-400 mb-6 space-y-2 list-disc list-inside",
          children: [/* @__PURE__ */ jsxs("li", {
            children: [/* @__PURE__ */ jsx("b", {
              className: "text-pink-400",
              children: "ตาราง positions"
            }), ": ใช้เก็บข้อมูลตำแหน่งงาน เช่น ครูใหญ่, หัวหน้าแผนก"]
          }), /* @__PURE__ */ jsxs("li", {
            children: [/* @__PURE__ */ jsx("b", {
              className: "text-pink-400",
              children: "ตาราง teachers"
            }), ": ใช้เก็บข้อมูลคุณครู แต่ละคนจะเชื่อมโยงกับตำแหน่งงานในตาราง", " ", /* @__PURE__ */ jsx("code", {
              className: "text-sm font-mono text-pink-400",
              children: "positions"
            }), " ", "ผ่าน", " ", /* @__PURE__ */ jsx("code", {
              className: "text-sm font-mono text-yellow-300",
              children: "position_id"
            })]
          })]
        }), /* @__PURE__ */ jsx(CodeBlock, {
          code: sqlCode$1,
          language: "sql"
        })]
      }), /* @__PURE__ */ jsx(Footer, {})]
    })]
  });
});
const route20 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sCreateTable,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function meta({}) {
  return [{
    title: "Insert Demo Data"
  }, {
    name: "description",
    content: "SQL code to insert demo data for 'positions' and 'teachers' tables."
  }];
}
const sqlCode = `/* Demo Data for 'positions' table */
INSERT INTO positions (name) VALUES
('ครูใหญ่'),
('รองครูใหญ่'),
('หัวหน้าฝ่ายวิชาการ'),
('หัวหน้าฝ่ายปกครอง'),
('ครูประจำชั้น'),
('ครูสอนภาษา');

/* Demo Data for 'teachers' table */
INSERT INTO teachers (name, address, telephone, position_id) VALUES
('นายสมชาย ใจดี', '123 ถนนสุขุมวิท กรุงเทพฯ', '081-123-4567', 1),
('นางสาวสุภาภรณ์ รักเรียน', '456 ถนนพหลโยธิน กรุงเทพฯ', '082-234-5678', 2),
('นายวิชาญ ช่างสอน', '789 ถนนลาดพร้าว กรุงเทพฯ', '083-345-6789', 3),
('นางสาวลัดดาวัลย์ สุขเกษม', '101 ถนนพระราม 9 กรุงเทพฯ', '084-456-7890', 4),
('นายประเสริฐ ศรีสุข', '202 ถนนสาทร กรุงเทพฯ', '085-567-8901', 5),
('นางสาวศิริพร งามสง่า', '303 ถนนสุขุมวิท กรุงเทพฯ', '086-678-9012', 5),
('นายเอกชัย ฉลาดคิด', '404 ถนนรัชดาภิเษก กรุงเทพฯ', '087-789-0123', 5),
('นางสาวกมลรัตน์ เก่งกาจ', '505 ถนนรามอินทรา กรุงเทพฯ', '088-890-1234', 6),
('นายธนวัฒน์ พลเยี่ยม', '606 ถนนเพชรบุรี กรุงเทพฯ', '089-901-2345', 5),
('นางปรีดา พัฒนา', '707 ถนนวิภาวดีรังสิต กรุงเทพฯ', '090-012-3456', 5);`;
const sInsertInto = UNSAFE_withComponentProps(function InsertIntoPage() {
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-900 text-white p-8 font-sans",
    children: [/* @__PURE__ */ jsx(Nav, {}), /* @__PURE__ */ jsxs("div", {
      className: "container mx-auto max-w-4xl pt-20",
      children: [/* @__PURE__ */ jsx("h1", {
        className: "text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text",
        children: "แทรกข้อมูลตัวอย่าง"
      }), /* @__PURE__ */ jsxs("p", {
        className: "text-center text-gray-400 mb-10 text-lg",
        children: ["คำสั่ง SQL สำหรับการแทรกข้อมูล (insert data) จำนวน 6 รายการสำหรับตาราง", " ", /* @__PURE__ */ jsx("code", {
          className: "text-sm font-mono text-pink-400",
          children: "positions"
        }), " และ 10 รายการสำหรับตาราง", " ", /* @__PURE__ */ jsx("code", {
          className: "text-sm font-mono text-pink-400",
          children: "teachers"
        })]
      }), /* @__PURE__ */ jsxs(motion.div, {
        className: "p-6 rounded-xl border-t-4 border-b-4 border-purple-500",
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5
        },
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-2xl font-bold mb-4 text-white",
          children: "คำสั่ง SQL"
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-gray-400 mb-4",
          children: ["คำสั่ง", " ", /* @__PURE__ */ jsx("code", {
            className: "text-sm font-mono text-yellow-300",
            children: "INSERT INTO"
          }), " ", "นี้จะเพิ่มข้อมูลเริ่มต้นลงในฐานข้อมูล ทำให้สามารถทดสอบฟังก์ชันต่างๆ ของแอปพลิเคชันได้ทันที"]
        }), /* @__PURE__ */ jsx(CodeBlock, {
          code: sqlCode,
          language: "sql"
        })]
      }), /* @__PURE__ */ jsx(Footer, {})]
    })]
  });
});
const route21 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: sInsertInto,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DAGpy5rC.js", "imports": ["/assets/chunk-PVWAREVJ-BKTQPsXo.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-CxStpcM2.js", "imports": ["/assets/chunk-PVWAREVJ-BKTQPsXo.js"], "css": ["/assets/root-BxEGhKiS.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-BNlHZkLy.js", "imports": ["/assets/chunk-PVWAREVJ-BKTQPsXo.js", "/assets/Nav-CpNU6Ajp.js", "/assets/Footer-DS8jGZNM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/install": { "id": "routes/install", "parentId": "root", "path": "/install", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/install-BjEHApzC.js", "imports": ["/assets/chunk-PVWAREVJ-BKTQPsXo.js", "/assets/Nav-CpNU6Ajp.js", "/assets/CodeBlock-BN9FJjQ-.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/backend/s-db": { "id": "routes/backend/s-db", "parentId": "root", "path": "/backends/db", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/s-db-81pCif5g.js", "imports": ["/assets/chunk-PVWAREVJ-BKTQPsXo.js", "/assets/Nav-CpNU6Ajp.js", "/assets/CodeBlock-BN9FJjQ-.js", "/assets/Footer-DS8jGZNM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/backend/s-package": { "id": "routes/backend/s-package", "parentId": "root", "path": "/backends/package", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/s-package-C45cffcd.js", "imports": ["/assets/chunk-PVWAREVJ-BKTQPsXo.js", "/assets/Nav-CpNU6Ajp.js", "/assets/CodeBlock-BN9FJjQ-.js", "/assets/Footer-DS8jGZNM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/backend/s-server": { "id": "routes/backend/s-server", "parentId": "root", "path": "/backends/server", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/s-server-DJbC0F2D.js", "imports": ["/assets/chunk-PVWAREVJ-BKTQPsXo.js", "/assets/Nav-CpNU6Ajp.js", "/assets/CodeBlock-BN9FJjQ-.js", "/assets/Footer-DS8jGZNM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/backend/s-positionController": { "id": "routes/backend/s-positionController", "parentId": "root", "path": "/backends/positionController", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/s-positionController-Bq7Slx4E.js", "imports": ["/assets/chunk-PVWAREVJ-BKTQPsXo.js", "/assets/Nav-CpNU6Ajp.js", "/assets/CodeBlock-BN9FJjQ-.js", "/assets/Footer-DS8jGZNM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/backend/s-teacherController": { "id": "routes/backend/s-teacherController", "parentId": "root", "path": "/backends/teacherController", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/s-teacherController-DIJVn3G6.js", "imports": ["/assets/chunk-PVWAREVJ-BKTQPsXo.js", "/assets/Nav-CpNU6Ajp.js", "/assets/CodeBlock-BN9FJjQ-.js", "/assets/Footer-DS8jGZNM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/backend/s-errorHandler": { "id": "routes/backend/s-errorHandler", "parentId": "root", "path": "/backends/errorHandler", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/s-errorHandler-B2GaImJ6.js", "imports": ["/assets/chunk-PVWAREVJ-BKTQPsXo.js", "/assets/Nav-CpNU6Ajp.js", "/assets/CodeBlock-BN9FJjQ-.js", "/assets/Footer-DS8jGZNM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/backend/s-default-svg": { "id": "routes/backend/s-default-svg", "parentId": "root", "path": "/backends/svg", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/s-default-svg-ia6TJI9L.js", "imports": ["/assets/chunk-PVWAREVJ-BKTQPsXo.js", "/assets/Nav-CpNU6Ajp.js", "/assets/CodeBlock-BN9FJjQ-.js", "/assets/Footer-DS8jGZNM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/backend/s-index": { "id": "routes/backend/s-index", "parentId": "root", "path": "/backends/index", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/s-index-CegxTQzh.js", "imports": ["/assets/chunk-PVWAREVJ-BKTQPsXo.js", "/assets/Nav-CpNU6Ajp.js", "/assets/CodeBlock-BN9FJjQ-.js", "/assets/Footer-DS8jGZNM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/backend/s-positionRoutes": { "id": "routes/backend/s-positionRoutes", "parentId": "root", "path": "/backends/positionRoutes", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/s-positionRoutes-jqhxQBIU.js", "imports": ["/assets/chunk-PVWAREVJ-BKTQPsXo.js", "/assets/Nav-CpNU6Ajp.js", "/assets/CodeBlock-BN9FJjQ-.js", "/assets/Footer-DS8jGZNM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/backend/s-teacherRoutes": { "id": "routes/backend/s-teacherRoutes", "parentId": "root", "path": "/backends/teacherRoutes", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/s-teacherRoutes-CaDmhxWz.js", "imports": ["/assets/chunk-PVWAREVJ-BKTQPsXo.js", "/assets/Nav-CpNU6Ajp.js", "/assets/CodeBlock-BN9FJjQ-.js", "/assets/Footer-DS8jGZNM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/fontend/s-nav": { "id": "routes/fontend/s-nav", "parentId": "root", "path": "/fontends/Nav", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/s-nav-g1IwghYC.js", "imports": ["/assets/chunk-PVWAREVJ-BKTQPsXo.js", "/assets/Nav-CpNU6Ajp.js", "/assets/CodeBlock-BN9FJjQ-.js", "/assets/Footer-DS8jGZNM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/fontend/s-home": { "id": "routes/fontend/s-home", "parentId": "root", "path": "/fontends/home", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/s-home-BTeH9WXz.js", "imports": ["/assets/chunk-PVWAREVJ-BKTQPsXo.js", "/assets/Nav-CpNU6Ajp.js", "/assets/CodeBlock-BN9FJjQ-.js", "/assets/Footer-DS8jGZNM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/fontend/s-position": { "id": "routes/fontend/s-position", "parentId": "root", "path": "/fontends/position", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/s-position-CEX_7V7T.js", "imports": ["/assets/chunk-PVWAREVJ-BKTQPsXo.js", "/assets/Nav-CpNU6Ajp.js", "/assets/CodeBlock-BN9FJjQ-.js", "/assets/Footer-DS8jGZNM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/fontend/s-teacher": { "id": "routes/fontend/s-teacher", "parentId": "root", "path": "/fontends/teacher", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/s-teacher-B_eGKECv.js", "imports": ["/assets/chunk-PVWAREVJ-BKTQPsXo.js", "/assets/Nav-CpNU6Ajp.js", "/assets/CodeBlock-BN9FJjQ-.js", "/assets/Footer-DS8jGZNM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/fontend/s-customSelect": { "id": "routes/fontend/s-customSelect", "parentId": "root", "path": "/fontends/CustomSelect", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/s-customSelect-D5sgs6Pz.js", "imports": ["/assets/chunk-PVWAREVJ-BKTQPsXo.js", "/assets/Nav-CpNU6Ajp.js", "/assets/CodeBlock-BN9FJjQ-.js", "/assets/Footer-DS8jGZNM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/fontend/s-routes": { "id": "routes/fontend/s-routes", "parentId": "root", "path": "/fontends/routes", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/s-routes-DSQYSnvv.js", "imports": ["/assets/chunk-PVWAREVJ-BKTQPsXo.js", "/assets/CodeBlock-BN9FJjQ-.js", "/assets/Nav-CpNU6Ajp.js", "/assets/Footer-DS8jGZNM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/database/s-create-database": { "id": "routes/database/s-create-database", "parentId": "root", "path": "/database/create-database", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/s-create-database-CZfzO7sS.js", "imports": ["/assets/chunk-PVWAREVJ-BKTQPsXo.js", "/assets/Nav-CpNU6Ajp.js", "/assets/CodeBlock-BN9FJjQ-.js", "/assets/Footer-DS8jGZNM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/database/s-create-table": { "id": "routes/database/s-create-table", "parentId": "root", "path": "/database/create-table", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/s-create-table-BrHArAmn.js", "imports": ["/assets/chunk-PVWAREVJ-BKTQPsXo.js", "/assets/Nav-CpNU6Ajp.js", "/assets/CodeBlock-BN9FJjQ-.js", "/assets/Footer-DS8jGZNM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/database/s-insert-into": { "id": "routes/database/s-insert-into", "parentId": "root", "path": "/database/insert-into", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/s-insert-into-XGMcP3hZ.js", "imports": ["/assets/chunk-PVWAREVJ-BKTQPsXo.js", "/assets/Nav-CpNU6Ajp.js", "/assets/CodeBlock-BN9FJjQ-.js", "/assets/Footer-DS8jGZNM.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-3489719b.js", "version": "3489719b", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/install": {
    id: "routes/install",
    parentId: "root",
    path: "/install",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/backend/s-db": {
    id: "routes/backend/s-db",
    parentId: "root",
    path: "/backends/db",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/backend/s-package": {
    id: "routes/backend/s-package",
    parentId: "root",
    path: "/backends/package",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/backend/s-server": {
    id: "routes/backend/s-server",
    parentId: "root",
    path: "/backends/server",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/backend/s-positionController": {
    id: "routes/backend/s-positionController",
    parentId: "root",
    path: "/backends/positionController",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/backend/s-teacherController": {
    id: "routes/backend/s-teacherController",
    parentId: "root",
    path: "/backends/teacherController",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/backend/s-errorHandler": {
    id: "routes/backend/s-errorHandler",
    parentId: "root",
    path: "/backends/errorHandler",
    index: void 0,
    caseSensitive: void 0,
    module: route8
  },
  "routes/backend/s-default-svg": {
    id: "routes/backend/s-default-svg",
    parentId: "root",
    path: "/backends/svg",
    index: void 0,
    caseSensitive: void 0,
    module: route9
  },
  "routes/backend/s-index": {
    id: "routes/backend/s-index",
    parentId: "root",
    path: "/backends/index",
    index: void 0,
    caseSensitive: void 0,
    module: route10
  },
  "routes/backend/s-positionRoutes": {
    id: "routes/backend/s-positionRoutes",
    parentId: "root",
    path: "/backends/positionRoutes",
    index: void 0,
    caseSensitive: void 0,
    module: route11
  },
  "routes/backend/s-teacherRoutes": {
    id: "routes/backend/s-teacherRoutes",
    parentId: "root",
    path: "/backends/teacherRoutes",
    index: void 0,
    caseSensitive: void 0,
    module: route12
  },
  "routes/fontend/s-nav": {
    id: "routes/fontend/s-nav",
    parentId: "root",
    path: "/fontends/Nav",
    index: void 0,
    caseSensitive: void 0,
    module: route13
  },
  "routes/fontend/s-home": {
    id: "routes/fontend/s-home",
    parentId: "root",
    path: "/fontends/home",
    index: void 0,
    caseSensitive: void 0,
    module: route14
  },
  "routes/fontend/s-position": {
    id: "routes/fontend/s-position",
    parentId: "root",
    path: "/fontends/position",
    index: void 0,
    caseSensitive: void 0,
    module: route15
  },
  "routes/fontend/s-teacher": {
    id: "routes/fontend/s-teacher",
    parentId: "root",
    path: "/fontends/teacher",
    index: void 0,
    caseSensitive: void 0,
    module: route16
  },
  "routes/fontend/s-customSelect": {
    id: "routes/fontend/s-customSelect",
    parentId: "root",
    path: "/fontends/CustomSelect",
    index: void 0,
    caseSensitive: void 0,
    module: route17
  },
  "routes/fontend/s-routes": {
    id: "routes/fontend/s-routes",
    parentId: "root",
    path: "/fontends/routes",
    index: void 0,
    caseSensitive: void 0,
    module: route18
  },
  "routes/database/s-create-database": {
    id: "routes/database/s-create-database",
    parentId: "root",
    path: "/database/create-database",
    index: void 0,
    caseSensitive: void 0,
    module: route19
  },
  "routes/database/s-create-table": {
    id: "routes/database/s-create-table",
    parentId: "root",
    path: "/database/create-table",
    index: void 0,
    caseSensitive: void 0,
    module: route20
  },
  "routes/database/s-insert-into": {
    id: "routes/database/s-insert-into",
    parentId: "root",
    path: "/database/insert-into",
    index: void 0,
    caseSensitive: void 0,
    module: route21
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
