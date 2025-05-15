import { useParams } from "react-router";

const TenantEditPage = () => {
  let params = useParams();

  return (
    <div>
      <h1>TenantEditPage</h1>
      <p>Tenant ID: {params.tid}</p>
    </div>
  );
}

export default TenantEditPage;
