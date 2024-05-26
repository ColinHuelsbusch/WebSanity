import { useEffect, useState } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import logo from "data-base64:~assets/logo.svg"
import "./style.css"

function IndexPopup() {
  const [enabled, setEnabled] = useStorage<boolean>("enabled", (value) =>
    typeof value === "undefined" ? true : Boolean(value)
  );
  const [childMode, setChildMode] = useStorage<boolean>("childMode", (value) =>
    typeof value === "undefined" ? false : Boolean(value)
  );

  return (
    <div
      style={{
        width: 310,
        height: 100,
        padding: 10,
        background: "rgb(51, 51, 51)",
        margin: -8
      }}>
      <img src={logo} alt="" height="100" />
      <span style={{top: 20, right: 88}}>Enabled </span>
      <span style={{top: 71, right: 88}}>Child Mode</span>
      <input type="checkbox" id="off" checked={enabled} onChange={(event) => { setEnabled(event.target.checked); storage.set('enabled', String(event.target.checked)) }} /><label for="off">Toggle</label>
      <input type="checkbox" id="blur" checked={childMode} onChange={(event) => { setChildMode(event.target.checked); storage.set('childMode', String(event.target.checked)) }} /><label for="blur" style={{ top: 61, right: 11, position: "absolute"}}>Toggle</label>
    </div>
  )
}

export default IndexPopup
