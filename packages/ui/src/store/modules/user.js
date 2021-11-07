const API_URL = process.env.VUE_APP_API_URL;
const user_URL = `${API_URL}/user-config`;

const user = {
    state: {
        allusers: [],
        currentuser: null
    },
    mutations: {
        POPULATE_userS_FROM_DB(state, newusers) {


            if (newusers) {
                newusers = newusers.map(newBot => {
                    newBot.createdAt = new Date(newBot.createdAt).toUTCString();
                    return newBot;
                });
                state.allusers.push(...newusers);
            }
            // do you have to
            state.allusers.reverse();
        },
        CREATE_user(state, saveduser) {
            state.allusers.push(saveduser.data.data);
        },
        UPDATE_user(state, userData) {
            state.allusers.find(b => {
                if (b._id == userData._id) {
                    b = Object.assign(b, userData);
                }
            });
        },
        SET_CURRENT_user(state, currentuser) {
            state.currentuser = currentuser;
        }
    },
    actions: {
        fetchusersFromDB({
            commit,
            state
        }) {
            if (!state.allusers || state.allusers.length == 0) {
                return csAxios
                    .get(user_URL)
                    .then(res => {
                        commit('POPULATE_userS_FROM_DB', res.data.data); //double nested
                    })
                    .catch(err => {
                        console.error('Error retrieving bots from DB:', err);
                        throw err;
                    });
            } else {
                return state.allusers;
            }
        },
        createuser({
            commit
        }, userData) {
            return csAxios
                .post(`${user_URL}`, userData)
                .then(createduser => {
                    commit('CREATE_user', createduser);
                    return createduser;
                })
                .catch(err => {
                    console.error('Error creating user in DB:', err);
                    throw err;
                });
        },
        updateuser({
            commit
        }, userData) {
            return csAxios
                .put(`${user_URL}/${userData.id}`, userData, {
                    silent: true
                })
                .then(res => {
                    commit('UPDATE_user', res.data.data);
                })
                .catch(err => {
                    console.error('Error updating user in DB:', err);
                    throw err;
                });
        },
        setCurrentuser({
            commit
        }, currentuser) {
            commit('SET_CURRENT_user', currentuser);
        }
    },
    getters: {
        getAllusers: state => {
            return [...state.allusers];
        },
        getCurrentuser: state => () => {
            return {
                ...state.currentuser
            };
        },
        getuserByName: state => userName => {
            let specifieduser = {};
            if (!userName) return specifieduser;

            try {
                specifieduser = state.allusers.find(
                    user => user.name.toLowerCase() === userName.toLowerCase()
                );
            } catch (exp) {
                console.error('Exception occurred in getuserByName ', exp);
            }
            // Return a copy of the user (so we don't directly modify the store)
            return {
                ...specifieduser
            };
        }
    }
};

export default user;