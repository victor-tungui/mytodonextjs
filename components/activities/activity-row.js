function ActivityRow(props) {
  const { activity } = props;

  const activityUrl = `/activities/${activity.id}`;
  const todosUrl = `/todos/${activity.id}`;

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
        <a href={todosUrl} className='link-primary ms-1'>
          Todos
        </a>
      </td>
    </tr>
  );
}

export default ActivityRow;
