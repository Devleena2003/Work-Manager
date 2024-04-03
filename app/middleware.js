import { NextResponse } from "next/server";

export function middleware(request) {
  console.log("middleware executed");
  const authToken = request.cookies.get("authToken")?.value;
  if (
    request.nextUrl.pathname === "/api/login" ||
    request.nextUrl.pathname === "/api/user"
  ) {
    return;
  }
  if (request.nextUrl.pathname === "/api/login") return;
  const loggedInUserNotAccessPaths =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname == "/signup";

  if (loggedInUserNotAccessPaths) {
    if (authToken) {
      return NextResponse.redirect(new URL("/profile/user", request.url));
    }
  } else {
    //accessing secure route
    if (!authToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  console.log(authToken);
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/add-task",
    "/show-tasks",
    "/profile/:path*",
    "/api/:path*",
  ],
};
