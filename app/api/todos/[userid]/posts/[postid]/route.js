import { NextResponse } from "next/server";

export function GET(request, { params }) {
  //destructuring the  params
  const { userid, postid } = params;
  console.log("user id", userid);
  console.log("postid", postid);
  return NextResponse.json(params);
}
