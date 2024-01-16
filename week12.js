$(document).ready(function() {
    const url = 'https://659f482c5023b02bfe8962d9.mockapi.io/Game-form/Video-Games';

    // READ
    function getGames() {
        $.ajax({
            url: url,
            method: 'GET',
            success: function(games) {
                let output = '<ul>';
                $.each(games, function(key, game) {
                    output += `
                        <li>
                            ${game.name}, ${game.genre}
                            <button class="edit-button" data-id="${game.id}">Edit</button>
                            <button class="delete-button" data-id="${game.id}">Delete</button>
                        </li>
                    `;
                });
                output += '</ul>';
                $('#output').html(output);
            }
        });
    }

    // CREATE
    $('#game-form').on('submit', function(e) {
        e.preventDefault();
        let name = $('#gameName').val();
        let genre = $('#gameGenre').val();
        $.ajax({
            url: url,
            method: 'POST',
            data: {
                name: name,
                genre: genre
            },
            success: function(game) {
                $('#game-form').trigger('reset');
                getGames();
            }
        });
    });

    // UPDATE
    $('body').on('click', '.edit-button', function() {
        let id = $(this).data('id');
        $.ajax({
            url: `${url}/${id}`,
            method: 'GET',
            success: function(game) {
                $('#gameId').val(game.id);
                $('#gameName').val(game.name);
                $('#gameGenre').val(game.genre);
            }
        });
    });

    // DELETE
    $('body').on('click', '.delete-button', function() {
        let id = $(this).data('id');
        $.ajax({
            url: `${url}/${3}`,
            method: 'DELETE',
            success: function() {
                getGames();
            }
        });
    });

    getGames();
});