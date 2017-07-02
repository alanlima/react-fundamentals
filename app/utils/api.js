import Axios from 'axios';

const id = '';
const sec = '';
const params = '?client_id=' + id + '&client_secret=' + sec;

function getProfile(username) {
    return Axios.get('https://api.github.com/users/' + username)
        .then(function(user){
            return user.data;
        });
}

function getRepos (username){
    return Axios.get('https://api.github.com/users/' + username);
}

module.exports = {
    battle: function(players) {

    },

    fetchPopularRepos: function(language) {
        var encodedURI = window.encodeURI(
            'https://api.github.com/search/repositories?q=stars:>1+language:' +
            language +
            '&sort=star&order=desc&type=Repositories'
        );

        return Axios.get(encodedURI)
            .then(function(response){
                return response.data.items;
            });
    }
};