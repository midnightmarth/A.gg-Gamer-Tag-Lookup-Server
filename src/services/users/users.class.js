/* eslint-disable no-unused-vars */
const axios = require('axios');


exports.Users = class Users {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    return axios.get('https://api-v1.athletes.gg/users', {
      params: {
        gamerTag: params.query.user
      }
    })
      .then(athleteData => {
        return axios.get('https://api-v1.athletes.gg/placings?$limit=5&$sort[end]=-1',{
          params: 
          {
            athlete: athleteData.data.data[0].id
          }
        })
          .then(lastFiveData => {
            return {lastFive: lastFiveData.data, athleteData: athleteData.data};
          }).catch(err => {
            console.error('an error has occurred when getting athlete data: ', err);
            return err;
          });
      })
      .catch(err => {
        console.error('Got error', err);
        return err;
      });
    //call https://api-v1.athletes.gg/users?gamerTag=name
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
};
