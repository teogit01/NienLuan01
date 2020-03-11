'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
        queryInterface.addColumn(
          'ShowTimes',
          'idFilm',
          Sequelize.INTEGER,
          {
            after: 'endTime'
          },
        ),
        queryInterface.addColumn(
          'ShowTimes',
          'idShedule',
          Sequelize.INTEGER,
          {
            after: 'endTime'
          },
        )
    ])
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('ShowTimes','idFilm'),
      queryInterface.removeColumn('ShowTimes','idShedule')
    ])
  }
};
