function ActivityRow(props) {
  const { activity } = props;

  const activityUrl = `/activities/${activity.id}`;

  return (
    <tr>
      <td>{activity.name}</td>
      <td>{activity.description}</td>
      <td>{new Date(activity.created).toDateString()}</td>
      <td>{activity.status}</td>
      <td>
        <a href={activityUrl} className='link-primary'>
          View
        </a>
      </td>
    </tr>
  );
}

export default ActivityRow;
