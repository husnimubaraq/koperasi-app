import api from "~/apis";
import { acceptHMRUpdate, defineStore } from "pinia";
import type { TResponseSingle } from "~/types/response.interface";
import type {
  TLoginForm,
  TRegisterForm,
  TAuth,
  TUpdateForm,
} from "~/types/auth.interface";
import { TUser } from "~/components/features/auth/types/user.interface";

interface TLoginErrors {
  email: string[];
  password: string[];
}

interface TRegisterErrors {
  name: string[];
  password: string[];
  email: string[];
  alamat: string[];
  jenis_kelamin: string[];
  tanggal_lahir: string[];
  nomor_hp: string[];
  nik: string[];
}

export const useAuthStore = defineStore("auth", {
  state: () => {
    let userJson = localStorage.getItem("user") ?? (null as any);

    if (userJson) {
      userJson = JSON.parse(userJson);
    }

    return {
      user: userJson as TAuth | null,
      profile: {} as TUser | null,
      returnUrl: "",
      error: "",
      errors: {} as TLoginErrors,
      errorsRegister: {} as TRegisterErrors,
      responseStatus: false,
    };
  },
  actions: {
    async getProfile() {
      try {
        const response = await api.get<TResponseSingle<TLoginErrors, TUser>>(
          "profile"
        );

        this.profile = response.data.result;
      } catch (err: any) {
        const { response } = err;

        this.error = response.data.message;

        if (response.data.errors) {
          this.errors = response.data.errors;
        }
      }
    },
    async updateProfile(params: TUpdateForm) {
      try {
        const response = await api.post<TResponseSingle<TRegisterErrors, {}>>(
          "update-profile",
          params
        );

        this.responseStatus = response.data.status;

        this.error = "";

        setTimeout(() => {
          this.responseStatus = false;
        }, 2000);
      } catch (err: any) {
        const { response } = err;

        this.error = response.data.message;

        if (response.data.errors) {
          this.errorsRegister = response.data.errors;
        }
      }
    },
    async login(params: TLoginForm) {
      try {
        const response = await api.post<TResponseSingle<TLoginErrors, TAuth>>(
          "login",
          {
            email: params.username,
            password: params.password,
          }
        );

        this.user = response.data.result;
        this.error = "";

        this.responseStatus = response.data.status;

        setTimeout(() => {
          this.responseStatus = false;
        }, 2000);

        localStorage.setItem("user", JSON.stringify(response.data.result));
      } catch (err: any) {
        const { response } = err;

        this.error = response.data.message;

        setTimeout(() => {
          this.error = "";
        }, 2000);

        if (response.data.errors) {
          this.errors = response.data.errors;
        }
      }
    },
    async register(params: TRegisterForm) {
      try {
        const response = await api.post<
          TResponseSingle<TRegisterErrors, TAuth>
        >("register", params);

        this.user = response.data.result;

        this.responseStatus = response.data.status;

        this.error = "";

        setTimeout(() => {
          this.responseStatus = false;
        }, 2000);

        localStorage.setItem("user", JSON.stringify(response.data.result));
      } catch (err: any) {
        const { response } = err;

        this.error = response.data.message;

        if (response.data.errors) {
          this.errorsRegister = response.data.errors;
        }
      }
    },
    async logout() {
      try {
        const response = await api.post<TResponseSingle<{}, {}>>("logout");

        this.user = null;
        this.profile = null;
        this.responseStatus = false;

        localStorage.removeItem("user");

        this.$router.push("/login");
      } catch (err: any) {
        const { response } = err;

        this.error = response.data.message;

        if (response.data.errors) {
          this.errorsRegister = response.data.errors;
        }
      }
    },
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
