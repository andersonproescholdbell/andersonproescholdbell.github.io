import socket from './util/socket/socket';

export default {
  data: function() {
    return {
      password: ''
    }
  },
  computed: {
    signedIn: function() {
      return this.$store.state.signedIn;
    }
  },
  methods: {
    go: function() {
      socket.emit('login', String(this.password).replace(/ /g,''));
    },
    onLoggin: function(pass) {
      this.$store.commit('setSignIn', pass);
      if (pass) {
        try {
          var page = window.location.href.split('/');
          this.$router.push('/' + page[page.length-1]);
        }catch {
          this.$router.push('/home');
        }
        localStorage.setItem('loggedIn', (new Date()).getTime());
        socket.emit('loggedIn');
      }else {
        alert('Wrong password.');
      }
    }
  },
  mounted: function() {
    //opened site
    var lastLoggedIn = Number(localStorage.getItem('loggedIn'));
    //console.log(lastLoggedIn);
    //console.log('now: ' + (new Date()).getTime());
    /*if (((new Date()).getTime()-lastLoggedIn) < (1800*1000)) {
      this.onLoggin(true);
    }*/

    //on loggin
    socket.on('passCheck', (pass) => {
      this.onLoggin(pass);
    });

    this.$store.commit('setItemData', require('./util/json/itemData.json'));

    socket.on('priceData', (priceData) => {
      console.log('got priceData');
      this.$store.commit('setPriceData', priceData);
    });
  }
};
