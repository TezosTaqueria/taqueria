import React, { useState } from "react";
import parse from "html-react-parser";
import { useMailChimp } from "react-use-mailchimp-signup";
import styles from "./FooterForm.module.css";

function Feature() {
  const { error, loading, status, subscribe, message } = useMailChimp({
    action: `https://ecadlabs.us20.list-manage.com/subscribe/post?u=8fdd00e1ab81d5f5550fadb32&amp;id=de1bfb4af9`,
  });

  const [inputs, setInputs] = useState({
    "group[218840]": "1",
  });

  const handleInputChange = (event) => {
    event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    if (inputs) {
      subscribe(inputs);
    }
  };

  return (
    <>
      <div className={styles.footerForm}>
        {error && <h6>Please enter your email</h6>}
        {loading && <p>...Loading</p>}
        {message && <p>{message && parse(message)}</p>}

        <h5>Register for updates</h5>
        <form className={styles.footerInputContainer} onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            id="mchimpEmail"
            placeholder="Your email address"
            onChange={handleInputChange}
            className={styles.footerEmail}
          />
          {/* <input type="hidden" name="group[218840]" id="mce-group[218840]" value="Taqueria (Developer Tools)" /> */}
          <select type="hidden" name="group[218840]" class="REQ_CSS" id="mce-group[218840]" hidden>
			<optgroup hidden>
				<option value="1" selected>Taqueria (Developer Tools)</option>
				<option value="2">Taquito (Typescript Library)</option>
				<option value="4">Signatory (Remote Signer)</option>
			</optgroup>	
            <option value=""></option>

          </select>
          <button className={styles.signupButton} type="submit">
            Sign up
          </button>
        </form>
      </div>
    </>
  );
}

export default function FooterForm() {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <Feature />
      </div>
    </section>
  );
}
