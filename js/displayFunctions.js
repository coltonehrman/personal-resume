bio.display = function() {
  $('#header').prepend( replaceHTML(HTMLheaderRole, this.role) );
  $('#header').prepend( replaceHTML(HTMLheaderName, this.name) );

  $.each(this.contactLinks, function(type, contact){
    var newHTML;
    var url = 'http://' + type + '.com/' + contact;
    switch (type) {
      case 'codepen':
        url = url.replace('.com/', '.io/');
        break;
    }
    newHTML = replaceHTML(HTMLcontactLink, [url, url.replace('http://', '')]);
    $('#contactLinks').append(newHTML);
  });

  $.each(this.contacts, function(type, contact){
    var newHTML;
    newHTML = replaceHTML(HTMLcontactGeneric, [type, contact]);
    $('#contacts').append(newHTML);
  });

  $('#header').append( replaceHTML(HTMLbioPic, this.bioPic) );

  if (this.skills.length > 0) {
    $('#header').append(HTMLskillsStart);
    createRadarChart('#skills', this.skills);
  }
}

work.display = function() {
  $.each(this.jobs, function(index, job){
    $('#workExperience').append(HTMLworkStart);
    var $workArea = $('#workExperience').find('.work-entry').last();
    var employer = replaceHTML(HTMLworkEmployer, [job.employerUrl, job.employer]);
    var title = replaceHTML(HTMLworkTitle, job.title);
    var location = replaceHTML(HTMLworkLocation, job.location);
    var dates = replaceHTML(HTMLworkDates, job.dates);
    var description = replaceHTML(HTMLworkDescription, job.description);

    $workArea.append(employer + title);
    $workArea.append(location);
    $workArea.append(dates);
    $workArea.append(description);
  });
}

education.display = function() {
  var $parent = $('#education');
  $parent.append(HTMLonlineClasses);
  $.each(this.onlineCourses, function(index, course){
    $parent = $('#education');
    $parent.append(HTMLonlineSchoolStart);
    $parent = $parent.find('.education-entry').last();
    var title = replaceHTML(HTMLonlineTitle, [course.url, course.title]);
    var school = replaceHTML(HTMLonlineSchool, course.school);
    var dates = replaceHTML(HTMLonlineDates, course.dates);
    var url = replaceHTML(HTMLonlineURL, course.url);

    $parent.append(title + school);
    $parent.append(dates);
    $parent.append(url);
  });
}
