class htmlInput {
    constructor(teams) {
        this.teams = teams;
        this.players = [];
        let _this = this;
        this.teams.map(function(team) {
            team.topPlayers.map(function(player) {
                player['teamId'] = team.teamId;
                player['teamColor'] = team.teamColor;
                _this.players.push(player);
            });
        });
        this.availableTeams = this.teams;
        document.addEventListener('click', function(event) {
            let targetElement = event.srcElement || event.target;
            if (targetElement instanceof HTMLInputElement) {} else {
                _this.closeDropDown();
            }
        });
    }
    /*
     * Show an input to search and show list of teams
     */
    htmlInput(id, placeholder, teams) {
        let formGroup = document.createElement('div');
        formGroup.className = 'form-group rank-place col-12 col-md-4';

        let labelInput = document.createElement('label');
        labelInput.className = 'control-label d-none d-sm-block';
        labelInput.setAttribute('for', id);
        let labelInputText = document.createTextNode(placeholder + ':');
        labelInput.appendChild(labelInputText);

        let dropdown = document.createElement('div');
        dropdown.className = 'dropdown';

        let formInput = document.createElement('input');
        formInput.className = 'form-control text-center dropdown-toggle';
        formInput.setAttribute('id', id);
        formInput.setAttribute('placeholder', placeholder);
        formInput.setAttribute('data-toggle', 'dropdown');
        formInput.setAttribute('aria-haspopup', 'true');
        formInput.setAttribute('aria-expanded', 'false');
        let _this = this;
        if (id === 'filter-player') {
            formInput.addEventListener('click', function(event) {
                _this.playerList(event);
                _this.filterItems(event);
            });
        } else {
            formInput.addEventListener('click', function(event) {
                _this.teamList(event, teams, id);
                _this.filterItems(event);
            });
        }
        formInput.addEventListener('keyup', this.filterItems);

        dropdown.appendChild(formInput)

        formGroup.appendChild(labelInput);
        formGroup.appendChild(dropdown);

        return formGroup;
    }

    /*
     * When user open the list of teams
     */
    teamList(event, teams, id) {
        this.closeDropDown();
        event.stopPropagation();
        let dropdownMenu = document.createElement('div');
        dropdownMenu.className = 'dropdown-menu show w-100';
        dropdownMenu.setAttribute('aria-labelledby', 'dropdownMenuButton');
        dropdownMenu.setAttribute('x-placement', 'bottom-start');
        let teamSet = (teams == 'all')
            ? this.teams
            : this.availableTeams;
        for (let teamIndex in teamSet) {
            let thisTeam = teamSet[teamIndex];
            let teamElement = document.createElement('a');
            teamElement.className = 'dropdown-item team';
            teamElement.setAttribute('data-id', thisTeam.teamId);
            teamElement.addEventListener('click', this.selectTeam.bind(this));

            let teamRow = document.createElement('div');
            teamRow.className = 'row';

            let teamName = document.createElement('div');
            teamName.className = 'col-8 item-name p-0';
            let teamNameText = document.createTextNode(thisTeam.teamName);
            teamName.appendChild(teamNameText);

            let teamColor = document.createElement('div');
            teamColor.className = 'col-4 border p-0';
            teamColor.style.backgroundColor = thisTeam.teamColor;

            let teamInput = document.createElement('input');
            teamInput.setAttribute('type', 'hidden');
            teamInput.setAttribute('name', id);
            teamInput.value = thisTeam.teamId;
            teamRow.appendChild(teamInput);

            teamRow.appendChild(teamName);
            teamRow.appendChild(teamColor);
            teamElement.appendChild(teamRow);
            dropdownMenu.appendChild(teamElement);
        }
        let targetElement = event.srcElement || event.target;
        targetElement.parentNode.appendChild(dropdownMenu);
    }

    /*
     * When user open the list of players
     */
    playerList(event, teams, id) {
        this.closeDropDown();
        event.stopPropagation();
        let targetElement = event.srcElement || event.target;
        let dropdownMenu = document.createElement('div');
        dropdownMenu.className = 'dropdown-menu show w-100';
        dropdownMenu.setAttribute('aria-labelledby', 'dropdownMenuButton');
        dropdownMenu.setAttribute('x-placement', 'bottom-start');
        let filteredPlayers = this.players;
        if (targetElement.closest('.league-name').querySelectorAll('input[name="filter-team"]').length > 0) {
            let selectedTeamId = targetElement.closest('.league-name').querySelectorAll('input[name="filter-team"]')[0].value;
            filteredPlayers = this.players.filter(function(player) {
                return parseInt(player.teamId) === parseInt(selectedTeamId);
            });
        }
        let scores = this.players.map(function(thisPlayer, index) {
            return thisPlayer.goalsLastSeason
        });
        let max = Math.max(...scores);
        for (let playerIndex in filteredPlayers) {
            let thisPlayer = filteredPlayers[playerIndex];
            let playerElement = document.createElement('a');
            playerElement.className = 'dropdown-item team';
            playerElement.setAttribute('data-id', thisPlayer.playerId);
            playerElement.addEventListener('click', this.selectPlayer.bind(this));

            let playerRow = document.createElement('div');
            playerRow.className = 'row';

            let playerName = document.createElement('div');
            playerName.className = 'col-8 item-name p-0';
            let playerNameText = document.createTextNode(thisPlayer.playerName);
            playerName.appendChild(playerNameText);

            let playerInfo = document.createElement('div');
            playerInfo.className = 'col-4 p-1 d-flex text-light bg-secondary';

            let teamColor = document.createElement('div');
            teamColor.className = 'p-0 small';
            let playerScoreText = document.createTextNode(thisPlayer.goalsLastSeason + ' Goals');
            teamColor.style.backgroundColor = thisPlayer.teamColor;
            teamColor.style.width = ((100 * thisPlayer.goalsLastSeason) / max) + '%';
            teamColor.style.textShadow = '1px 1px 1px black';
            teamColor.appendChild(playerScoreText);

            playerInfo.appendChild(teamColor);

            let playerInput = document.createElement('input');
            playerInput.setAttribute('type', 'hidden');
            playerInput.setAttribute('name', id);
            playerInput.value = thisPlayer.playerId;
            playerRow.appendChild(playerInput);

            playerRow.appendChild(playerName);
            playerRow.appendChild(playerInfo);
            playerElement.appendChild(playerRow);
            dropdownMenu.appendChild(playerElement);
        }
        targetElement.parentNode.appendChild(dropdownMenu);
    }

    /*
     * When user search for an item
     */
    filterItems(event) {
        let targetElement = event.srcElement || event.target;
        let dropdownItems = document.body.querySelectorAll('.dropdown-menu .dropdown-item');
        for (let i = 0; i < dropdownItems.length; i++) {
            let thisItem = dropdownItems[i];
            let item = thisItem.getElementsByClassName("item-name")[0];
            if (item.innerHTML.toUpperCase().indexOf(targetElement.value.toUpperCase()) > -1) {
                thisItem.style.display = "";
            } else {
                thisItem.style.display = "none";
            }
        }
    }

    /*
     * When user select a team from list
     */
    selectTeam(event) {
        let targetElement = event.srcElement || event.target;
        let dropdown = targetElement.closest('.dropdown');
        //Remove the old selected element
        this.removeSelectedItem(targetElement)
        //Add new selected element
        let selectedTeam = targetElement.closest('.dropdown-item');
        selectedTeam.classList.add('selected-item');
        dropdown.appendChild(selectedTeam);
        //Remove selected team form list of teams
        this.availableTeams = this.availableTeams.filter(function(team) {
            if (parseInt(selectedTeam.getAttribute('data-id')) == parseInt(team.teamId)) {
                return false;
            }
            return true;
        }).map(function(team) {
            return team;
        });
        //Close the list
        this.closeDropDown();
        //Clear the input
        dropdown.querySelector('input').value = "";
        //If user clicked on the selected item remove it
        let _this = this;
        selectedTeam.addEventListener('click', function(event) {
            let targetElement = event.srcElement || event.target;
            _this.removeSelectedItem(targetElement)
        });
    }

    removeSelectedItem(targetElement) {
        let dropdown = targetElement.closest('.dropdown');
        //Remove the old selected element
        if (dropdown.querySelectorAll('.selected-item').length > 0) {
            //Add the removed team to the list of teams
            let teamId = dropdown.querySelectorAll('.selected-item')[0].getAttribute('data-id');
            let newTeam = this.teams.filter(function(team) {
                return parseInt(teamId) === team.teamId;
            });
            this.availableTeams.unshift(newTeam[0]);
            //Remove the old team element
            dropdown.removeChild(dropdown.querySelectorAll('.selected-item')[0]);
        }
    }

    /*
     * When user select a team from list
     */
    selectPlayer(event) {
        let targetElement = event.srcElement || event.target;
        let dropdown = targetElement.closest('.dropdown');
        //Remove the old selected element
        if (dropdown.querySelectorAll('.selected-item').length > 0) {
            //Remove the old team element
            dropdown.removeChild(dropdown.querySelectorAll('.selected-item')[0]);
        }
        //Add new selected element
        let selectedPlayer = targetElement.closest('.dropdown-item');
        selectedPlayer.classList.add('selected-item');
        dropdown.appendChild(selectedPlayer);
        //Close the list
        this.closeDropDown();
        //Clear the input
        dropdown.querySelector('input').value = "";
        let _this = this;
        selectedPlayer.addEventListener('click', function(event) {
            let targetElement = event.srcElement || event.target;
            _this.removeSelectedItem(targetElement)
        });
    }
    closeDropDown() {
        let dropdownMenu = document.body.getElementsByClassName('dropdown-menu');
        if (dropdownMenu.length > 0) {
            dropdownMenu[0].parentNode.removeChild(dropdownMenu[0]);
        }
    }
}
export default htmlInput;
