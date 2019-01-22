new Vue({
    el:'#app',
    data:{
        playerHealth:100,
        monsterHealth:100,
        gameIsRunning:false,
        turns:[],
    },
    methods:{
        startGame:function () {
            this.gameIsRunning=true;
            this.monsterHealth=100;
            this.playerHealth=100;
            this.turns=[];
        },
        attack:function () {

            var damage=this.calculateDamage(10, 3);
            this.monsterHealth -=damage;

            if(this.checkWin())
            {
                return;
            }

            this.turns.unshift({isPlayer:true, text:'Player hit Monster for '+damage});

            this.monsterAttack();

        },
        monsterAttack:function(){
            var damage = this.calculateDamage(12, 5);
            this.playerHealth -= damage;

            this.checkWin();

            this.turns.unshift({isPlayer: false, text: 'Monster hit Player for ' + damage});
        },
        calculateDamage:function(max, min){
            return Math.max(Math.floor(Math.random()*max) + 1, min);
        },
        checkWin:function(){
            if(this.monsterHealth<=0)
            {
                if(confirm('You won, want to start a new game ?'))
                {
                    this.startGame();
                }else{
                    this.gameIsRunning=false;
                }
                return true;
            }
            else if(this.playerHealth<=0)
            {
                if(confirm('You lost :( want to start a new game ?'))
                {
                    this.startGame();
                }else{
                    this.gameIsRunning=false;
                }
                return true;
            }
            return false;
        },
        specialAttack:function () {
            var damage=this.calculateDamage(20, 10);
            this.monsterHealth -=damage;

            if(this.checkWin())
            {
                return;
            }
            this.turns.unshift({isPlayer:true, text:'Player Hard hit Monster for '+damage});
            this.monsterAttack();
        },

        heal:function () {
            if(this.playerHealth<=90)
            {
                this.playerHealth +=10;
            }
            else
            {
                this.playerHealth=100;
            }

            this.turns.unshift({isPlayer:true, text:'Player heals for 10'});
            this.monsterAttack();
        },
        giveUp:function () {
            this.gameIsRunning=false;
        }
    },
});