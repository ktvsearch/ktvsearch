$(document).ready(function () {

    $('#example thead th').each(function () {
        var title = $(this).text();
        var html = '<input style="width: 100%; font-size: 1.25em; min-width: 100px;" type="text" placeholder="' + title + '" />';
        $(this).html(html);
        $(this).css("padding", "8px 60px 8px 8px");
        $(this).css("text-align", "left");        
    });


    var gridData = [];

    packet.videoItems.forEach(function (row) {
        var video = '<a class="videoTitle" href="' + 'https://youtu.be/' + row.id + '" target="_blank">' + row.title + '</a>';
        video += '<p class="description">' + row.description + '</p>';
        gridData.push({
            date: row.publishDate.substr(0, 10),
            video: video
        });
    });

    var table = $('#example').DataTable({
        // paging: false,
        fixedHeader: true,
        pageLength: 50,
        scrollY: '80vh',
        sDom: 'Rfrtlip',
        data: gridData,
        columns: [
            { "data": "video" },
            { "data": "date", "type": "date" }
        ]
    });

    // Apply the search
    table.columns().every(function () {
        var that = this;
        var input = $('input', this.header());
        var timeout = null;
        var searchFunction = function () {
            if (that.search() !== input.value) {
                var value = input.val();
                that.search(value, false, true).draw();
            }
            timeout = null;
        };

        


        input.on('keyup change', function () {
            if (timeout != null) {
                window.clearTimeout(timeout);
            }
            timeout = window.setTimeout(searchFunction, 1000);
        });

        input.click(function (event) {
            event.stopPropagation();
        });
    });
});

