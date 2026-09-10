export default function ContactUsPage() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Talk to us</p>
          <h1>Contact us</h1>
          <p>We are in Ilaro, Ogun State — a few minutes from Dangote Cement and the main town routes.</p>
        </div>
      </section>

      <section className="container section-pad">
        <div className="account-grid">
          <div className="card account-panel">
            <h2>Visit</h2>
            <p>
              3 Tunji Otegbeye Street, Ona Egbo,
              <br />
              Ilaro, Ogun State
            </p>
            <h2>Call</h2>
            <p>
              <a href="tel:08075963676">08075963676</a>
              <br />
              <a href="tel:07060922880">07060922880</a>
            </p>
            <h2>Email</h2>
            <p>
              <a href="mailto:info@oapartment.com">info@oapartment.com</a>
            </p>
          </div>
          <div className="card account-panel">
            <h2>Send a message</h2>
            <form className="auth-form">
              <label>
                Name
                <input className="input" name="name" required placeholder="Your name" />
              </label>
              <label>
                Email
                <input className="input" type="email" name="email" required placeholder="you@email.com" />
              </label>
              <label>
                Message
                <textarea className="input" name="message" rows={5} required placeholder="How can we help?" />
              </label>
              <button className="btn btn-primary" type="submit">
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
