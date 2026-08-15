"use client";

import { useState } from "react";
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

export default function ContactCard() {
  const [saved, setSaved] = useState(false);

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

        <div className="sealWrap">
          {/* Official coat of arms — served from /public, swap the file there if the ministry supplies updated artwork */}
          <img
            src="/coat-of-arms-uganda.png"
            alt="Coat of Arms of the Republic of Uganda"
            width={148}
            height={148}
            style={{ width: 148, height: "auto" }}
            className="crestImg"
          />
        </div>

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

        <div className="qrGrid">
          <a href={googleContactsUrl} target="_blank" rel="noreferrer" className="qrCard">
            <img
              src="/qr-save-contact.svg"
              alt="QR code to save Namisi Derrick to contacts"
              className="qrImg"
            />
            <span>Save contact</span>
          </a>
          <a href="https://www.education.go.ug" target="_blank" rel="noreferrer" className="qrCard">
            <img
              src="/qr-ministry-website.svg"
              alt="QR code to the Ministry of Education and Sports website"
              className="qrImg"
            />
            <span>Ministry site</span>
          </a>
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
