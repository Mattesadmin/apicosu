import { Navigate, useLocation } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { ModulePageTemplate } from "@/components/ModulePageTemplate";
import { modules } from "@/data/modules";

const ModulePage = () => {
  const location = useLocation();
  const module = modules.find((item) => item.path === location.pathname);

  if (!module) {
    return <Navigate to="/" replace />;
  }

  return (
    <AppLayout>
      <ModulePageTemplate module={module} />
    </AppLayout>
  );
};

export default ModulePage;
