import BasicTable from '../ui/tables/basic-table';
import ActivityRow from '../activities/activity-row';

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
    <BasicTable headerConfig={tableDefinition}>
      {activities.map((activity) => (
        <ActivityRow activity={activity} />
      ))}
    </BasicTable>
  );
}

export default ActivityList;
