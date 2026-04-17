class ForgetPasswordPage {
  constructor(page) {
    this.page = page;
  }

  get forgetPasswordHeading() {
    return this.page.getByRole('heading', { name: 'Forget Password' });
  }

  get emailTextbox() {
    return this.page.getByRole('textbox', { name: '* Email' });
  }

  get sendOtpButton() {
    return this.page.getByRole('button', { name: 'SEND OTP' });
  }

  get loginHereLink() {
    return this.page.getByRole('link', { name: 'Login Here' });
  }

  async open() {
    await this.page.goto('/forget');
  }
}

module.exports = ForgetPasswordPage;
