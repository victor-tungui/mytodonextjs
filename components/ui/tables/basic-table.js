function BasicTable(props) {
  const { header, id } = props.headerConfig;

  return (
    <table className='table' id={id} key={id}>
      <thead>
        <tr>
          {header.map((th) => (
            <th key={th.key}>{th.title}</th>
          ))}
        </tr>
      </thead>
      <tbody>{props.children}</tbody>
      <tfoot></tfoot>
    </table>
  );
}

export default BasicTable;
