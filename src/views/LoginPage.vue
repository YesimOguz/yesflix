<template>
  <main class="login">
    <section class="forms">
      <form class="login" @submit.prevent="login()">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email address"
          v-model="loginForm.email"
        />
        <input
          type="password"
          placeholder="Password"
          v-model="loginForm.password"
        />
        <input type="submit" value="Login" />
        <button class="signup" @click="$router.push('/signup')">Signup</button>
      </form>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: null,
        password: null,
      },
      isDisabled: false,
    };
  },
  methods: {
    login() {
      if (!this.isDisabled) {
        this.isDisabled = true;
        this.$store
          .dispatch("login", this.loginForm)
          .then(() => {
            this.$notify({
              type: "success",
              text: "Login Success!",
            });
            this.$router.push("/");
          })
          .catch((error) => {
            switch (error.code) {
              case "auth/user-not-found":
                this.$notify({ type: "error", text: "User not found" });
                break;
              case "auth/wrong-password":
                this.$notify({ type: "error", text: "Wrong password" });
                break;
              default:
                this.$notify({ type: "error", text: "Something went wrong" });
            }
          })
          .finally(() => {
            this.isDisabled = false;
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.forms {
  display: flex;
  min-height: 100vh;
  flex-direction: row;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
}

form {
  flex: 1 1 0%;
  padding: 8rem 1rem 1rem;

  @media only screen and (max-width: 768px) {
    padding: 2rem 1rem 1rem;
    max-width: 100%;
  }
}

h2 {
  font-size: 2rem;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

input {
  appearance: none;
  border: none;
  outline: none;
  background: none;
  display: block;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 0rem;

  @media only screen and (max-width: 768px) {
    max-width: none;
  }
}

input:not([type="submit"]) {
  opacity: 0.8;
  transition: 0.4s;
}

input:focus:not([type="submit"]) {
  opacity: 1;
}

input::placeholder {
  color: inherit;
}

form.login input:not([type="submit"]) {
  color: #ffffff;
  border-bottom: 2px solid #ffffff;
}

form.login input[type="submit"] {
  background-image: linear-gradient(to bottom right, #b38bbb 0%, #453c46 100%);
  color: #fff;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
  display: block;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 0rem;
  border: none;
}

.signup {
  background-color: #fff;
  color: #965ea1;
  font-weight: 700;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
  text-transform: uppercase;
  display: block;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  padding: 0.5rem 0rem;
  border: none;
}
</style>
