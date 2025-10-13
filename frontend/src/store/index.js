import { createStore } from "vuex";
import AuthService from "../services";
import TokenService from "../services/token";
import GetService from "../services/get";

const user = JSON.parse(localStorage.getItem("user"));
const access_token = JSON.parse(localStorage.getItem("access_token"));
const refresh_token = JSON.parse(localStorage.getItem("refresh_token"));

const initialState = user
  ? {
      loggedIn: true,
      access_token,
      refresh_token,
      isAdmin: user.is_admin,
      user: user,
    }
  : {
      loggedIn: false,
      access_token: null,
      refresh_token: null,
      isAdmin: false,
      user: null,
    };

const initialCityState = {
  currentCity: null,
  allCities: [],
};

export const store = createStore({
  modules: {
    auth: {
      namespaced: true,
      state: initialState,
      getters: {
        loggedIn: (state) => state.loggedIn,
        user: (state) => state.user,
        accessToken: (state) => state.access_token,
        refreshToken: (state) => state.refresh_token,
        isAdmin: (state) => state.user.is_admin,
      },
      actions: {
        login({ commit }, user) {
          return AuthService.login(user).then(
            async (tokens) => {
              TokenService.setLocalRefreshToken(tokens.refresh);
              TokenService.setLocalAccessToken(tokens.access);
              return await AuthService.me().then(
                async (me) => {
                  TokenService.setLocalUser(me);
                  commit("loginSuccess", { user: me, tokens: tokens });
                  return Promise.resolve(me);
                },
                (error) => {
                  commit("loginFailure");
                  return Promise.reject(error);
                }
              );
            },
            (error) => {
              commit("loginFailure");
              return Promise.reject(error);
            }
          );
        },
        logout({ commit }) {
          commit("logout");
          TokenService.removeRefreshToken();
          TokenService.removeAccessToken();
          TokenService.removeUser();
          return Promise.resolve();
        },
        register({ commit }, user) {
          return AuthService.register(user).then(
            (response) => {
              commit("registerSuccess");
              return Promise.resolve(response.data);
            },
            (error) => {
              commit("registerFailure");
              return Promise.reject(error);
            }
          );
        },
        refreshToken({ commit }, accessToken) {
          commit("refreshToken", accessToken);
        },
      },
      mutations: {
        loginSuccess(state, user) {
          state.loggedIn = true;
          state.access_token = user.tokens.access;
          state.refresh_token = user.tokens.refresh;
          state.user = user.user;
        },
        refreshToken(state, accessToken) {
          state.loggedIn = true;
          state.access_token = accessToken;
        },
        loginFailure(state) {
          state.loggedIn = false;
          state.user = null;
          state.access_token = null;
          state.refresh_token = null;
          state.isAdmin = false;
        },
        logout(state) {
          state.loggedIn = false;
          state.access_token = null;
          state.refresh_token = null;
          state.user = null;
          state.isAdmin = false;
        },
        registerSuccess(state) {
          state.loggedIn = false;
        },
        registerFailure(state) {
          state.loggedIn = false;
        },
      },
    },

    // Club Module
    club: {
      namespaced: true,
      state: {
        clubs: [],
        loading: false,
        error: null
      },
      getters: {
        clubs: (state) => state.clubs,
        loading: (state) => state.loading,
        error: (state) => state.error
      },
      actions: {
        async fetchClubs({ commit }) {
          commit('SET_LOADING', true);
          commit('SET_ERROR', null);
          try {
            const response = await GetService.getClubs(true);
            commit('SET_CLUBS', response);
            return response;
          } catch (error) {
            commit('SET_ERROR', error.message || 'Failed to fetch clubs');
            console.error("Error fetching clubs:", error);
            throw error;
          } finally {
            commit('SET_LOADING', false);
          }
        }
      },
      mutations: {
        SET_LOADING(state, loading) {
          state.loading = loading;
        },
        SET_ERROR(state, error) {
          state.error = error;
        },
        SET_CLUBS(state, clubs) {
          state.clubs = clubs;
        }
      }
    },


    convener: {
      namespaced: true,
      state: {
        conveners: [],
        loading: false,
        error: null
      },
      getters: {
        conveners: (state) => state.conveners,
        loading: (state) => state.loading,
        error: (state) => state.error
      },
      actions: {
        async fetchConveners({ commit }) {
          commit('SET_LOADING', true);
          commit('SET_ERROR', null);
          try {
            const response = await GetService.getConveners(true);
            commit('SET_CONVENERS', response); // FIXED: Changed from SET_PRESIDENTS to SET_CONVENERS
            return response;
          } catch (error) {
            commit('SET_ERROR', error.message || 'Failed to fetch conveners');
            console.error("Error fetching conveners:", error);
            throw error;
          } finally {
            commit('SET_LOADING', false);
          }
        }
      },
      mutations: {
        SET_LOADING(state, loading) {
          state.loading = loading;
        },
        SET_ERROR(state, error) {
          state.error = error;
        },
        SET_CONVENERS(state, conveners) { // FIXED: Correct mutation name
          state.conveners = conveners;
        }
      }
    },



    // President Module
    president: {
      namespaced: true,
      state: {
        presidents: [],
        loading: false,
        error: null
      },
      getters: {
        presidents: (state) => state.presidents,
        loading: (state) => state.loading,
        error: (state) => state.error
      },
      actions: {
        async fetchPresidents({ commit }) {
          commit('SET_LOADING', true);
          commit('SET_ERROR', null);
          try {
            const response = await GetService.getPresidents(true);
            commit('SET_PRESIDENTS', response);
            return response;
          } catch (error) {
            commit('SET_ERROR', error.message || 'Failed to fetch presidents');
            console.error("Error fetching presidents:", error);
            throw error;
          } finally {
            commit('SET_LOADING', false);
          }
        }
      },
      mutations: {
        SET_LOADING(state, loading) {
          state.loading = loading;
        },
        SET_ERROR(state, error) {
          state.error = error;
        },
        SET_PRESIDENTS(state, presidents) {
          state.presidents = presidents;
        }
      }
    },

    // Vice President Module
    vicePresident: {
      namespaced: true,
      state: {
        vicePresidents: [],
        loading: false,
        error: null
      },
      getters: {
        vicePresidents: (state) => state.vicePresidents,
        loading: (state) => state.loading,
        error: (state) => state.error
      },
      actions: {
        async fetchVicePresidents({ commit }) {
          commit('SET_LOADING', true);
          commit('SET_ERROR', null);
          try {
            const response = await GetService.getVicePresidents(true);
            commit('SET_VICE_PRESIDENTS', response);
            return response;
          } catch (error) {
            commit('SET_ERROR', error.message || 'Failed to fetch vice presidents');
            console.error("Error fetching vice presidents:", error);
            throw error;
          } finally {
            commit('SET_LOADING', false);
          }
        }
      },
      mutations: {
        SET_LOADING(state, loading) {
          state.loading = loading;
        },
        SET_ERROR(state, error) {
          state.error = error;
        },
        SET_VICE_PRESIDENTS(state, vicePresidents) {
          state.vicePresidents = vicePresidents;
        }
      }
    },

    // General Secretary Module
    generalSecretary: {
      namespaced: true,
      state: {
        generalSecretaries: [],
        loading: false,
        error: null
      },
      getters: {
        generalSecretaries: (state) => state.generalSecretaries,
        loading: (state) => state.loading,
        error: (state) => state.error
      },
      actions: {
        async fetchGeneralSecretaries({ commit }) {
          commit('SET_LOADING', true);
          commit('SET_ERROR', null);
          try {
            const response = await GetService.getGeneralSecretaries(true);
            commit('SET_GENERAL_SECRETARIES', response);
            return response;
          } catch (error) {
            commit('SET_ERROR', error.message || 'Failed to fetch general secretaries');
            console.error("Error fetching general secretaries:", error);
            throw error;
          } finally {
            commit('SET_LOADING', false);
          }
        }
      },
      mutations: {
        SET_LOADING(state, loading) {
          state.loading = loading;
        },
        SET_ERROR(state, error) {
          state.error = error;
        },
        SET_GENERAL_SECRETARIES(state, generalSecretaries) {
          state.generalSecretaries = generalSecretaries;
        }
      }
    },

    // Treasurer Module
    treasurer: {
      namespaced: true,
      state: {
        treasurers: [],
        loading: false,
        error: null
      },
      getters: {
        treasurers: (state) => state.treasurers,
        loading: (state) => state.loading,
        error: (state) => state.error
      },
      actions: {
        async fetchTreasurers({ commit }) {
          commit('SET_LOADING', true);
          commit('SET_ERROR', null);
          try {
            const response = await GetService.getTreasurers(true);
            commit('SET_TREASURERS', response);
            return response;
          } catch (error) {
            commit('SET_ERROR', error.message || 'Failed to fetch treasurers');
            console.error("Error fetching treasurers:", error);
            throw error;
          } finally {
            commit('SET_LOADING', false);
          }
        }
      },
      mutations: {
        SET_LOADING(state, loading) {
          state.loading = loading;
        },
        SET_ERROR(state, error) {
          state.error = error;
        },
        SET_TREASURERS(state, treasurers) {
          state.treasurers = treasurers;
        }
      }
    },

    // Executive Module
    executive: {
      namespaced: true,
      state: {
        executives: [],
        loading: false,
        error: null
      },
      getters: {
        executives: (state) => state.executives,
        loading: (state) => state.loading,
        error: (state) => state.error
      },
      actions: {
        async fetchExecutives({ commit }) {
          commit('SET_LOADING', true);
          commit('SET_ERROR', null);
          try {
            const response = await GetService.getExecutives(true);
            commit('SET_EXECUTIVES', response);
            return response;
          } catch (error) {
            commit('SET_ERROR', error.message || 'Failed to fetch executives');
            console.error("Error fetching executives:", error);
            throw error;
          } finally {
            commit('SET_LOADING', false);
          }
        },
        async fetchClubExecutives({ commit }, clubId) {
          commit('SET_LOADING', true);
          commit('SET_ERROR', null);
          try {
            const response = await GetService.getClubExecutives(clubId, true);
            commit('SET_EXECUTIVES', response);
            return response;
          } catch (error) {
            commit('SET_ERROR', error.message || 'Failed to fetch club executives');
            console.error("Error fetching club executives:", error);
            throw error;
          } finally {
            commit('SET_LOADING', false);
          }
        }
      },
      mutations: {
        SET_LOADING(state, loading) {
          state.loading = loading;
        },
        SET_ERROR(state, error) {
          state.error = error;
        },
        SET_EXECUTIVES(state, executives) {
          state.executives = executives;
        }
      }
    },

    // Event Module
    event: {
      namespaced: true,
      state: {
        events: [],
        loading: false,
        error: null
      },
      getters: {
        events: (state) => state.events,
        loading: (state) => state.loading,
        error: (state) => state.error
      },
      actions: {
        async fetchEvents({ commit }) {
          commit('SET_LOADING', true);
          commit('SET_ERROR', null);
          try {
            const response = await GetService.getEvents(true);
            commit('SET_EVENTS', response);
            return response;
          } catch (error) {
            commit('SET_ERROR', error.message || 'Failed to fetch events');
            console.error("Error fetching events:", error);
            throw error;
          } finally {
            commit('SET_LOADING', false);
          }
        },
        async fetchClubEvents({ commit }, clubId) {
          commit('SET_LOADING', true);
          commit('SET_ERROR', null);
          try {
            const response = await GetService.getClubEvents(clubId, true);
            commit('SET_EVENTS', response);
            return response;
          } catch (error) {
            commit('SET_ERROR', error.message || 'Failed to fetch club events');
            console.error("Error fetching club events:", error);
            throw error;
          } finally {
            commit('SET_LOADING', false);
          }
        },
        async fetchEvent({ commit }, eventId) {
          commit('SET_LOADING', true);
          commit('SET_ERROR', null);
          try {
            const response = await GetService.getEvent(eventId, true);
            return response;
          } catch (error) {
            commit('SET_ERROR', error.message || 'Failed to fetch event');
            console.error("Error fetching event:", error);
            throw error;
          } finally {
            commit('SET_LOADING', false);
          }
        }
      },
      mutations: {
        SET_LOADING(state, loading) {
          state.loading = loading;
        },
        SET_ERROR(state, error) {
          state.error = error;
        },
        SET_EVENTS(state, events) {
          state.events = events;
        }
      }
    },
    

    // Post Module (existing)
    post: {
      namespaced: true,
      state: {
        currentPost: null,
        posts: [],
      },
      getters: {
        currentPost: (state) => state.currentPost,
        posts: (state) => state.posts,
      },
      actions: {
        async fetchPosts({ commit }) {
          try {
            const response = await GetService.getPosts(true);
            commit("setPosts", response);
            return response;
          } catch (error) {
            console.error("Error fetching posts:", error);
            throw error;
          }
        },
        async fetchPost({ commit }, id) {
          try {
            const response = await GetService.getPost(id, true);
            commit("setCurrentPost", response);
            return response;
          } catch (error) {
            console.error("Error fetching post:", error);
            throw error;
          }
        },
        async createPost({ commit }, postData) {
          try {
            const response = await GetService.createPost(postData, true);
            commit("addPost", response);
            return response;
          } catch (error) {
            console.error("Error creating post:", error);
            throw error;
          }
        },
        async updatePost({ commit }, { id, postData }) {
          try {
            const response = await GetService.updatePost(id, postData, true);
            commit("updatePost", response);
            return response;
          } catch (error) {
            console.error("Error updating post:", error);
            throw error;
          }
        },
        async deletePost({ commit }, id) {
          try {
            await GetService.deletePost(id, true);
            commit("removePost", id);
            return true;
          } catch (error) {
            console.error("Error deleting post:", error);
            throw error;
          }
        },
        clearCurrentPost({ commit }) {
          commit("clearCurrentPost");
        },
      },
      mutations: {
        setPosts(state, posts) {
          state.posts = posts;
        },
        addPost(state, post) {
          state.posts.push(post);
        },
        updatePost(state, updatedPost) {
          const index = state.posts.findIndex((p) => p.id === updatedPost.id);
          if (index !== -1) {
            state.posts.splice(index, 1, updatedPost);
          }
        },
        removePost(state, id) {
          state.posts = state.posts.filter((p) => p.id !== id);
        },
        setCurrentPost(state, post) {
          state.currentPost = post;
        },
        clearCurrentPost(state) {
          state.currentPost = null;
        },
      },
    },
  },
});