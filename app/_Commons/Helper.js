import realm, { getNewId } from '../Realm/Realm'

export default Helper = {
	ellipsis(content, length) {
		return content.length > length ? (content.substring(0, length - 3) + '...') : content;
	},

  /** @param {Date}dueTime
   * @return {string} */
	remainTimeString(dueTime)
	{
    var countDownDate = dueTime.getTime();

    var now = (new Date()).getTime();

    var remainString = "";

    var distance, days, hours, minutes;

    if(countDownDate > now)
    {
      remainString = "Due in: ";

      distance = countDownDate - now;

      days = Math.floor(distance / (1000 * 60 * 60 * 24));
      if(days > 0)
        remainString += days + "d ";

      hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      if(hours > 0)
        remainString += hours + "h ";

      minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      remainString += minutes + "m ";
    }
    else if(countDownDate < now)
    {
      remainString = "Overdue by: ";

      distance = now - countDownDate;

      days = Math.floor(distance / (1000 * 60 * 60 * 24));
      if(days > 0)
        remainString += days + "d ";

      hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      if(hours > 0)
        remainString += hours + "h ";

      minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

      remainString += minutes + "m ";
    }

    return remainString;
	}
};

