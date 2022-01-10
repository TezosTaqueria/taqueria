---
title: Selections
---

export const Caution = ({ children, color }) => (
  <span
    style={{
      borderRadius: "2px",
      color: "#fff",
      padding: "0.2rem",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "rgba(252, 175, 23, 0.1)",
        borderRadius: "10px 0px 0px 10px",
        borderLeft: "solid #FCAF17 6px",
        padding: "15px 20px",
      }}
    >
      <div
        style={{
          color: "#FCAF17",
          fontFamily: "Montserrat",
          fontStyle: "normal",
          fontWeight: "bold",
          fontSize: "14px",
          lineHeight: "17px",
          fontVariant: "small-caps",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "11px",
          }}
        >
          <img src={require("../static/img/CautionIcon.png").default} />
          <div style={{ marginLeft: "14px" }}>CAUTION</div>
        </div>
      </div>
      <div
        style={{
          marginLeft: "30px",
          fontFamily: "Montserrat",
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "12px",
          lineHeight: "16px",
          color: "#FCAF17",
        }}
      >
        Taqueria is in the early stages of development. APIs and User Interfaces
        are unstable and likely to change.
      </div>
    </div>
  </span>
);

export const Info = ({ children, color }) => (
  <span
    style={{
      borderRadius: "2px",
      color: "#fff",
      padding: "0.2rem",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "rgba(160, 102, 170, 0.1)",
        borderRadius: "10px 0px 0px 10px",
        borderLeft: "solid #A066AA 6px",
        padding: "15px 20px",
      }}
    >
      <div
        style={{
          color: "#A066AA",
          fontFamily: "Montserrat",
          fontStyle: "normal",
          fontWeight: "bold",
          fontSize: "14px",
          lineHeight: "17px",
          fontVariant: "small-caps",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "11px",
          }}
        >
          <img src={require("../static/img/InfoIcon.png").default} />
          <div style={{ marginLeft: "14px" }}>INFO</div>
        </div>
      </div>
      <div
        style={{
          marginLeft: "30px",
          fontFamily: "Montserrat",
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "12px",
          lineHeight: "16px",
          color: "#A066AA",
        }}
      >
        Taqueria is in the early stages of development. APIs and User Interfaces
        are unstable and likely to change.
      </div>
    </div>
  </span>
);

export const Tip = ({ children, color }) => (
  <span
    style={{
      borderRadius: "2px",
      color: "#fff",
      padding: "0.2rem",
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "rgba(204, 185, 9, 0.1)",
        borderRadius: "10px 0px 0px 10px",
        borderLeft: "solid #CCB909 6px",
        padding: "15px 20px",
      }}
    >
      <div
        style={{
          color: "#CCB909",
          fontFamily: "Montserrat",
          fontStyle: "normal",
          fontWeight: "bold",
          fontSize: "14px",
          lineHeight: "17px",
          fontVariant: "small-caps",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginBottom: "11px",
          }}
        >
          <img src={require("../static/img/TipIcon.png").default} />
          <div style={{ marginLeft: "14px" }}>TIP</div>
        </div>
      </div>
      <div
        style={{
          marginLeft: "30px",
          fontFamily: "Montserrat",
          fontStyle: "normal",
          fontWeight: "500",
          fontSize: "12px",
          lineHeight: "16px",
          color: "#CCB909",
        }}
      >
        Taqueria is in the early stages of development. APIs and User Interfaces
        are unstable and likely to change.
      </div>
    </div>
  </span>
);

<Caution />
<Info />
<Tip />

**Placeholder text**

# Taqueria Intro

Let's discover **Taqueria in less than 10 minutes**.

## Getting Started

Get started by **creating a new Tezos project**.

## Generate a new Tezos project

Generate a new Tezos Project site using the **classic template**:

```shell
npm init taqueria@latest ....
```

## Start your development environment

Run the development server:

```shell
TBD
```

Your site starts at `http://localhost:3000`.
