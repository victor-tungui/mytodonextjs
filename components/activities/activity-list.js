import BasicTable from '../ui/tables/basic-table';

function ActivityList(props) {
  const { activities } = props;

  const tableDefinition = {
    id: 'userActivities',
    header: [
      { key: 'thName', title: 'Name' },
      { key: 'thDescription', title: 'Description' },
      { key: 'thCreated', title: 'Created On' },
      { key: 'thStatus', title: 'Status' },
      { key: 'thActions', title: 'Actions' },
    ],
  };

  return (
    <BasicTable definition={tableDefinition}>
      {activities.map((activity) => (
        <tr key={activity.id}>
          <td>{activity.name}</td>
          <td>{activity.description}</td>
          <td>{new Date(activity.created).toDateString()}</td>
          <td>{activity.status}</td>
          <td>
            <a href='#' className='link-primary'>
              View
            </a>
          </td>
        </tr>
      ))}
    </BasicTable>
  );
}

export default ActivityList;
