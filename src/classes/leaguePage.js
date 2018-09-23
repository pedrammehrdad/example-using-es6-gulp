import htmlInput from './htmlInput.js';

class leaguePage {
    constructor(aLeague) {
        this.country = aLeague.country;
        this.leagueName = aLeague.leagueName;
        this.teams = aLeague.teams;
    }

    render() {
        var aLeaguePage = document.createElement('div');
        aLeaguePage.className = 'col-12 league-name';
        aLeaguePage.appendChild(this.header());
        aLeaguePage.appendChild(this.teamsPrediction());
        aLeaguePage.appendChild(this.playerPrediction());
        aLeaguePage.appendChild(this.savePrediction());
        return aLeaguePage;
    }

    /*
     * Show league name and country
     */
    header() {
        var leagueTitle = document.createElement('h3');
        leagueTitle.className = 'py-3 text-center';
        var leagueTitleText = document.createTextNode(this.country + ' - ' + this.leagueName);
        leagueTitle.appendChild(leagueTitleText);
        return leagueTitle;
    }

    /*
     * Show three inputs for First and Second and Third
     */
    teamsPrediction() {
        var teamPredictionRow = document.createElement('div');
        teamPredictionRow.className = 'row';
        var teamPredictionHeader = document.createElement('div');
        teamPredictionHeader.className = 'col-12';
        var sectionHeader = document.createElement('h5');
        var sectionHeaderText = document.createTextNode('Top 3 teams:');
        sectionHeader.appendChild(sectionHeaderText);
        var hr = document.createElement('hr');
        teamPredictionHeader.appendChild(sectionHeader);
        teamPredictionHeader.appendChild(hr);

        teamPredictionRow.appendChild(teamPredictionHeader);
        var myHtmlInput = new htmlInput(this.teams);
        teamPredictionRow.appendChild(myHtmlInput.htmlInput('first-team', 'Select The First Team'))
        teamPredictionRow.appendChild(myHtmlInput.htmlInput('second-team', 'Select The Second Team'))
        teamPredictionRow.appendChild(myHtmlInput.htmlInput('third-team', 'Select The Third Team'))
        return teamPredictionRow;
    }

    /*
     * Show two inputs, one for players and one input to filter players by thier team
     */
    playerPrediction() {
        var playerPredictionRow = document.createElement('div');
        playerPredictionRow.className = 'row';
        var playerPredictionHeader = document.createElement('div');
        playerPredictionHeader.className = 'col-12';
        var sectionHeader = document.createElement('h5');
        var sectionHeaderText = document.createTextNode('Top Scorer:');
        sectionHeader.appendChild(sectionHeaderText);
        var hr = document.createElement('hr');
        playerPredictionHeader.appendChild(sectionHeader);
        playerPredictionHeader.appendChild(hr);

        playerPredictionRow.appendChild(playerPredictionHeader);
        var myHtmlInput = new htmlInput(this.teams);
        playerPredictionRow.appendChild(myHtmlInput.htmlInput('filter-team', 'Filter by a team'));
        playerPredictionRow.appendChild(myHtmlInput.htmlInput('filter-player', 'Select a player'));
        return playerPredictionRow;
    }

    /*
    * Show a button to prepare and send result to backend
    */
    savePrediction() {
        var saveButton = document.createElement('button');
        saveButton.className = 'btn btn-primary';
        var buttonText = document.createTextNode('Submit');
        saveButton.appendChild(buttonText);
        saveButton.addEventListener('click', function() {
            var hiddenInputs = document.querySelectorAll("input[type='hidden']");
            var data = {};
            for (var i = 0; i < hiddenInputs.length; i++) {
                data[hiddenInputs[i].getAttribute('name')] = hiddenInputs[i].value;
            }
            console.log(data)
        })
        return saveButton;
    }

}
export default leaguePage;
