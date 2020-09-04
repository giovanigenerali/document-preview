import React, { useState } from "react";

import "./App.css";

import { ReactComponent as MSOfficeIcon } from "./assets/ms-office.svg";
import { ReactComponent as GoogleDriveIcon } from "./assets/google-drive.svg";
import { ReactComponent as OpenUrlIcon } from "./assets/open-url.svg";
import { ReactComponent as GithubIcon } from "./assets/github.svg";

export default function App() {
  const [file, setFile] = useState(
    "https://file-examples-com.github.io/uploads/2017/02/file-sample_100kB.docx"
  );
  const [provider, setProvider] = useState("ms-office");
  const uiLanguage = "en-US";

  function handlePreview(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    const googleDriveUrl = `https://docs.google.com/viewerng/viewer?url=${encodeURIComponent(
      file
    )}`;
    const msOfficeUrl = `https://view.officeapps.live.com/op/view.aspx?ui=${uiLanguage}&src=${encodeURIComponent(
      file
    )}`;

    const openedPreviewExcel = document.createElement("a");

    openedPreviewExcel.href =
      provider === "google-drive" ? googleDriveUrl : msOfficeUrl;
    openedPreviewExcel.target = "_blank";

    document.body.appendChild(openedPreviewExcel);

    openedPreviewExcel.click();

    document.body.removeChild(openedPreviewExcel);
  }

  return (
    <div className="main">
      <h1>
        <span role="img" aria-label="emoji">
          🔮
        </span>{" "}
        Document Preview
      </h1>
      <p>
        Preview documents in MS Office or Google Drive, supported files{" "}
        <span>.doc, .docx, .xls, .xlxs, .ppt</span> and <span>.pptx</span>
      </p>

      <form onSubmit={handlePreview}>
        <input
          type="url"
          placeholder="Type URL here..."
          className="fileInput"
          pattern="https?:\/\/.*(\.docx?|\.xlsx?|\.pptx?|\.pdf)$"
          value={file}
          onChange={(event) => {
            setFile(event.target.value);
          }}
          autoFocus
          required
        />

        <div className="renderProviders">
          <label className={provider === "ms-office" ? "active" : ""}>
            <input
              type="radio"
              name="provider"
              value="ms-office"
              checked={provider === "ms-office"}
              onChange={(event) => setProvider(event.target.value)}
            />
            <MSOfficeIcon className="iconProvider" />
            <span>MS Office</span>
          </label>
          <label className={provider === "google-drive" ? "active" : ""}>
            <input
              type="radio"
              name="provider"
              value="google-drive"
              checked={provider === "google-drive"}
              onChange={(event) => setProvider(event.target.value)}
            />
            <GoogleDriveIcon className="iconProvider" />
            <span>Google Drive</span>
          </label>
        </div>

        <button type="submit" className="previewButton">
          Preview
          <OpenUrlIcon className="icon" />
        </button>
      </form>

      <p className="github">
        <GithubIcon className="iconGithub" />
        Created by
        <a
          href="https://github.com/giovanigenerali/document-preview"
          target="_blank"
          rel="noopener noreferrer"
        >
          @giovanigenerali
        </a>
      </p>
    </div>
  );
}
