import { href, useNavigate } from "react-router-dom";

import { IconArrowLeft, IconLogin2, IconUser } from "@tabler/icons-react";

import { Button } from "@/shared/components/ui/button";
import { ROUTES } from "@/shared/lib/paths";
import useAuthStore from "@/shared/use-auth-store";

export function Header() {
  const navigate = useNavigate();

  const { session } = useAuthStore();

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleAccountClick = () => {
    if (session?.sub) {
      navigate(href(ROUTES.USER, { userId: session.sub }));
    }
  };

  const handleLoginClick = () => {
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="px-[18px] sm:px-[24px] py-[12px] sm:py-[16px]">
      <div className="mx-auto flex justify-between items-center">
        {location.pathname !== ROUTES.HOME && (
          <Button
            className="cursor-pointer"
            variant="link"
            style={{ padding: 0 }}
            onClick={handleBackClick}
          >
            <IconArrowLeft /> назад
          </Button>
        )}

        <nav className="ml-auto">
          <ul className="flex space-x-6">
            <li>
              {session?.sub ? (
                <Button
                  className="cursor-pointer"
                  variant="link"
                  style={{ padding: 0 }}
                  onClick={handleAccountClick}
                >
                  акаунт <IconUser />
                </Button>
              ) : (
                location.pathname !== ROUTES.LOGIN && (
                  <Button
                    className="cursor-pointer"
                    variant="link"
                    style={{ padding: 0 }}
                    onClick={handleLoginClick}
                  >
                    Вхід <IconLogin2 />
                  </Button>
                )
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
