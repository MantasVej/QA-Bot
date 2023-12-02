var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate() {
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
    $('<div class="checkmark-sent-delivered">&check;</div>').appendTo($('.message:last'));
    $('<div class="checkmark-read">&check;</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();

  $('<div class="message loading new"><figure class="avatar"><img src="https://cdn-icons-png.flaticon.com/512/10492/10492267.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  // Update the URL to match your Flask app's endpoint
  $.post("/answer", { user_input: msg }, function (data) {
    $('.message.loading').remove();
    var out = data['answer'].replace("\n", "<br\>");
    $('<div class="message new"><figure class="avatar"><img src="https://cdn-icons-png.flaticon.com/512/10492/10492267.png" /></figure>' + out + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
  });
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
});

var Fake = [
  'Hi there, I\'m Doctorbot! Ask me anything you like about health care and medicine.',
]

function fakeMessage() {
  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="https://cdn-icons-png.flaticon.com/512/10492/10492267.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="https://cdn-icons-png.flaticon.com/512/10492/10492267.png" /></figure>' + Fake[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    i++;
  }, 1000 + (Math.random() * 20) * 100);
}

$('.button').click(function(){
  $('.menu .items span').toggleClass('active');
  $('.menu .button').toggleClass('active');
});
