import React from "react";
import AccountList from "../components/AccountList";
import AppBar from "../components/AppBar";

export default function HomePage() {
  return (
    <>
      <AppBar title="CoreKey Authenticator" isRoot={true}></AppBar>
      <AccountList></AccountList>
    </>
  );
}
