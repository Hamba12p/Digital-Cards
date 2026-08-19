"use client";

import { useRef, useState } from "react";
import { Phone, Mail, Share2, Download, UserPlus } from "lucide-react";

const googleContactsUrl =
  "https://contacts.google.com/new?" +
  new URLSearchParams({
    firstname: "Namisi",
    lastname: "Derrick",
    org: "Ministry of Education and Sports",
    title: "Principal Economist",
    phone: "+256779034746",
    email: "derricknamisi@gmail.com",
  }).toString();

const ownerQrLongPressMs = 650;

export default function ContactCard() {
  const [saved, setSaved] = useState(false);
  const [showOwnerQr, setShowOwnerQr] = useState(false);
  const crestTapTimes = useRef<number[]>([]);
  const ownerQrPressTimer = useRef<number | null>(null);
  const ownerQrLongPressTriggered = useRef(false);

  function handleCrestTap() {
    const now = Date.now();
    const recentTaps = [...crestTapTimes.current.filter((tap) => now - tap < 3000), now];

    if (recentTaps.length >= 3) {
      crestTapTimes.current = [];
      setShowOwnerQr((visible) => !visible);
      return;
    }

    crestTapTimes.current = recentTaps;
  }

  function cancelOwnerQrLongPress() {
    if (ownerQrPressTimer.current !== null) {
      window.clearTimeout(ownerQrPressTimer.current);
      ownerQrPressTimer.current = null;
    }
  }

  function startOwnerQrLongPress() {
    cancelOwnerQrLongPress();
    ownerQrLongPressTriggered.current = false;
    ownerQrPressTimer.current = window.setTimeout(() => {
      ownerQrPressTimer.current = null;
      ownerQrLongPressTriggered.current = true;

      const downloadLink = document.createElement("a");
      downloadLink.href = "/api/qr/card?download=1";
      downloadLink.download = "namisi-derrick-card-qr.svg";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
    }, ownerQrLongPressMs);
  }

  function handleOwnerQrClick(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!ownerQrLongPressTriggered.current) return;

    event.preventDefault();
    ownerQrLongPressTriggered.current = false;
  }

  function saveToContacts() {
    // iOS Safari opens this inline into the native Add Contact sheet.
    // Android browsers vary — some open it directly, others download
    // it first — which is a platform limit on Android's side, not
    // something the app can force from here.
    window.location.href = "/api/vcard";
    setSaved(true);
  }

  function shareCard() {
    if (navigator.share) {
      navigator
        .share({
          title: "Namisi Derrick — Ministry of Education and Sports",
          text: "Contact card for Namisi Derrick, Principal Economist, Ministry of Education and Sports.",
          url: typeof window !== "undefined" ? window.location.href : undefined,
        })
        .catch(() => {});
    } else {
      saveToContacts();
    }
  }

  return (
    <div className="page">
      <div className="card">
        <div className="innerBorder" />
        <p className="eyebrow">Republic of Uganda · Digital Contact</p>

        <button
          type="button"
          className="sealWrap"
          onClick={handleCrestTap}
          aria-label="Coat of Arms of the Republic of Uganda"
          aria-controls="owner-card-qr"
          aria-expanded={showOwnerQr}
        >
          {/* Official coat of arms — served from /public, swap the file there if the ministry supplies updated artwork */}
          <img
            src="/coat-of-arms-uganda.png"
            alt="Coat of Arms of the Republic of Uganda"
            width={148}
            height={148}
            style={{ width: 148, height: "auto" }}
            className="crestImg"
          />
        </button>

        <div className="identity">
          <h1 className="name">Namisi Derrick</h1>
          <p className="title">Principal Economist</p>
          <p className="org">
            Ministry of Education and Sports
            <br />
            Education Planning Department
          </p>
        </div>

        <div className="rule" />

        <button className="primaryBtn" onClick={saveToContacts}>
          <UserPlus size={15} strokeWidth={2} />
          {saved ? "Saved — tap again to re-download" : "Save to Contacts"}
        </button>

        <div className="secondaryRow">
          <a href={googleContactsUrl} target="_blank" rel="noreferrer" className="secondaryBtn">
            <Download size={13} /> Google Contacts
          </a>
          <button className="secondaryBtn" onClick={shareCard}>
            <Share2 size={13} /> Share
          </button>
        </div>

        <div className={`qrGrid${showOwnerQr ? "" : " qrGridSingle"}`}>
          <button type="button" className="qrCard" onClick={saveToContacts}>
            <img
              src="/api/qr/contact"
              alt="QR code to add Namisi Derrick to contacts"
              className="qrImg contactQrImg"
            />
            <span>Scan or tap to add contact</span>
          </button>
          {showOwnerQr && (
            <a
              id="owner-card-qr"
              href="/"
              className="qrCard ownerQrCard"
              onPointerDown={startOwnerQrLongPress}
              onPointerUp={cancelOwnerQrLongPress}
              onPointerCancel={cancelOwnerQrLongPress}
              onPointerLeave={cancelOwnerQrLongPress}
              onClick={handleOwnerQrClick}
              onContextMenu={(event) => event.preventDefault()}
            >
              <img
                src="/api/qr/card"
                alt="QR code to open Namisi Derrick's digital contact card"
                className="qrImg"
                draggable={false}
              />
              <span>Open this card</span>
            </a>
          )}
        </div>

        <div className="fields">
          <a href="tel:+256779034746" className="fieldRow">
            <span className="fieldLabel"><Phone size={11} /> Mobile</span>
            <span className="fieldValue">+256 779 034 746</span>
          </a>
          <a href="mailto:derricknamisi@gmail.com" className="fieldRow">
            <span className="fieldLabel"><Mail size={11} /> Email</span>
            <span className="fieldValue">derricknamisi@gmail.com</span>
          </a>
          <a href="mailto:derrick.namisi@education.go.ug" className="fieldRow">
            <span className="fieldLabel"><Mail size={11} /> Email</span>
            <span className="fieldValue">derrick.namisi@education.go.ug</span>
          </a>
        </div>

        <div className="addressBlock">
          <p className="addressLine">Plot 9-11, King George IV Way</p>
          <p className="addressLine">Embassy House, P.O. Box 7063</p>
          <p className="addressLine">Kampala, Uganda</p>
        </div>

        <p className="footer">www.education.go.ug</p>
      </div>
    </div>
  );
}
