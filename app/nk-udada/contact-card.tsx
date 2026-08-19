"use client";

import { useRef, useState } from "react";
import { Phone, Mail, Share2, Download, UserPlus } from "lucide-react";
import styles from "./contact-card.module.css";

const googleContactsUrl =
  "https://contacts.google.com/new?" +
  new URLSearchParams({
    firstname: "Naira Nantale",
    lastname: "Kateregga",
    org: "NK Udada Foundation",
    title: "Founder & Coordinator",
    phone: "+256762522306",
    email: "admin@the-nkfoundation.org",
  }).toString();

const ownerQrLongPressMs = 650;

export default function NkUdadaContactCard() {
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
      downloadLink.href = "/api/qr/card/nk-udada?download=1";
      downloadLink.download = "naira-nantale-kateregga-card-qr.svg";
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
    window.location.href = "/api/vcard/nk-udada";
    setSaved(true);
  }

  function shareCard() {
    if (navigator.share) {
      navigator
        .share({
          title: "Naira Nantale Kateregga — NK Udada Foundation",
          text: "Contact card for Naira Nantale Kateregga, Founder & Coordinator, NK Udada Foundation.",
          url: typeof window !== "undefined" ? window.location.href : undefined,
        })
        .catch(() => {});
    } else {
      saveToContacts();
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.innerBorder} />
        <p className={styles.eyebrow}>NK Udada Foundation · Digital Contact</p>

        <button
          type="button"
          className={styles.sealWrap}
          onClick={handleCrestTap}
          aria-label="NK Udada Foundation logo"
          aria-controls="owner-card-qr"
          aria-expanded={showOwnerQr}
        >
          {/* Foundation logo — served from /public, swap the file there if the org supplies updated artwork */}
          <img
            src="/nk-udada-logo.jpg"
            alt="NK Udada Foundation logo"
            width={148}
            height={148}
            style={{ width: 148, height: "auto" }}
            className={styles.crestImg}
          />
        </button>

        <div className={styles.identity}>
          <h1 className={styles.name}>Naira Nantale Kateregga</h1>
          <p className={styles.title}>Founder & Coordinator</p>
          <p className={styles.org}>
            NK Udada Foundation
            <br />
            Empower &amp; Equip · Uganda
          </p>
        </div>

        <div className={styles.rule} />

        <button className={styles.primaryBtn} onClick={saveToContacts}>
          <UserPlus size={15} strokeWidth={2} />
          {saved ? "Saved — tap again to re-download" : "Save to Contacts"}
        </button>

        <div className={styles.secondaryRow}>
          <a href={googleContactsUrl} target="_blank" rel="noreferrer" className={styles.secondaryBtn}>
            <Download size={13} /> Google Contacts
          </a>
          <button className={styles.secondaryBtn} onClick={shareCard}>
            <Share2 size={13} /> Share
          </button>
        </div>

        <div className={`${styles.qrGrid}${showOwnerQr ? "" : ` ${styles.qrGridSingle}`}`}>
          <button type="button" className={styles.qrCard} onClick={saveToContacts}>
            <img
              src="/api/qr/contact/nk-udada"
              alt="QR code to add Naira Nantale Kateregga to contacts"
              className={`${styles.qrImg} ${styles.contactQrImg}`}
            />
            <span>Scan or tap to add contact</span>
          </button>
          {showOwnerQr && (
            <a
              id="owner-card-qr"
              href="/nk-udada"
              className={`${styles.qrCard} ${styles.ownerQrCard}`}
              onPointerDown={startOwnerQrLongPress}
              onPointerUp={cancelOwnerQrLongPress}
              onPointerCancel={cancelOwnerQrLongPress}
              onPointerLeave={cancelOwnerQrLongPress}
              onClick={handleOwnerQrClick}
              onContextMenu={(event) => event.preventDefault()}
            >
              <img
                src="/api/qr/card/nk-udada"
                alt="QR code to open Naira Nantale Kateregga's digital contact card"
                className={styles.qrImg}
                draggable={false}
              />
              <span>Open this card</span>
            </a>
          )}
        </div>

        <div className={styles.fields}>
          <a href="tel:+256762522306" className={styles.fieldRow}>
            <span className={styles.fieldLabel}><Phone size={11} /> Mobile</span>
            <span className={styles.fieldValue}>+256 762 522 306</span>
          </a>
          <a href="mailto:admin@the-nkfoundation.org" className={styles.fieldRow}>
            <span className={styles.fieldLabel}><Mail size={11} /> Email</span>
            <span className={styles.fieldValue}>admin@the-nkfoundation.org</span>
          </a>
        </div>

        <div className={styles.addressBlock}>
          <p className={styles.addressLine}>Nansana East, East 1A</p>
          <p className={styles.addressLine}>Wakiso District, Uganda</p>
        </div>

        <p className={styles.footer}>www.the-nkfoundation.org</p>
      </div>
    </div>
  );
}
