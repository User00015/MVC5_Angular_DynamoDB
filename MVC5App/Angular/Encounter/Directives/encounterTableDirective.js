﻿app.directive('encounterTable', ['encounterService', '$modal', '$timeout', 'store', function (encounterService, $modal, $timeout, store) {
    return {
        restrict: "AE",
        templateUrl: "Angular/Encounter/Directives/encounterTable.html",
        scope: {
            encounter: '='
        },
        link: function (scope, element, attr) {

            scope.adjustedDifficulty = "";
            scope.toggle = true; //Defaults visible

            //var saveHandler = scope.save(); //scope.save()(encounter)

            var updateEncounters = function () {
                var monstersList = scope.encounter.monsters;
                encounterService.updateEncounters(function (xp) {
                    var difficulty = scope.encounter.difficulty;
                    difficulty.experienceValue = xp;
                    scope.adjustedDifficulty = getDifficulty(difficulty);
                }, monstersList);
            };

            var getDifficulty = function (difficulties) {
                var xp = scope.encounter.difficulty.experienceValue;
                if (difficulties.easy >= xp) return "Easy";
                if (difficulties.medium >= xp) return "Medium";
                if (difficulties.hard >= xp) return "Hard";
                if (difficulties.deadly >= xp) return "Deadly";
                return "Deadly++";
            };

            scope.getMonsterDetails = function (monster) {
                $modal({
                    templateUrl: 'Angular/Encounter/Statblock.html',
                    controller: 'StatblockModalController',
                    backdrop: true,
                    resolve: {
                        monsterId: function () {
                            return monster.id;
                        }
                    }
                });
            }

            scope.maximumDifficulty = function () {
                if (_.isNil(scope.encounter) || _.isNil(scope.$parent) || _.isNil(scope.$parent.difficulty)) return 0;

                return _.nth(_.values(scope.encounter.difficulty), scope.$parent.difficulty.value);
            }

            scope.$watch("encounter.monsters", function () {
                if (_.isNil(scope.encounter))
                    return;

                scope.adjustedDifficulty = getDifficulty(scope.encounter.difficulty);
                updateEncounters();
            }, true);

            scope.removeMonster = function (monster) {
                if (monster.quantity > 1) {
                    monster.quantity = monster.quantity - 1;
                } else {
                    scope.encounter.monsters = _.filter(scope.encounter.monsters, function (m) {
                        return m.id !== monster.id;
                    });
                }
                updateEncounters();
            }

            scope.addMonster = function (monster) {
                monster.quantity = monster.quantity + 1;
                updateEncounters();
            }
        }
    }
}]);