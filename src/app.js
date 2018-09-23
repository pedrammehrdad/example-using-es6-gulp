import league from './classes/league.js';
import leaguePage from './classes/leaguePage.js';
// import './css/bootstrap.min.css'
// import './css/app.scss'
class app {
    constructor() {
        this.myLeague = new league();
        this.render = this.render.bind(this);
    }
    initialize() {
        this.myLeague.getLeagues(this.render);
        document.addEventListener('click', function() {
            //closeDropDown()
        });
    }
    render() {
        document.querySelector('.waiting').parentNode.removeChild(document.querySelector('.waiting'))
        var container = document.createElement('div');
        container.className = 'container';

        var allLeages = document.createElement('div');
        allLeages.className = 'row all-leagues';
        //If there is more than one league:
        console.log(this)
        for (var countryLeageIndex in this.myLeague.leagues.leagues) {
            var cleaguePage = new leaguePage(this.myLeague.leagues.leagues[countryLeageIndex]);
            allLeages.appendChild(cleaguePage.render());
        }
        container.appendChild(allLeages);
        document.body.appendChild(container);

    }
}

var myApp = new app();
myApp.initialize();
