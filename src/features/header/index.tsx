import { Button } from "@/shared/components/ui/button";
import { ROUTES } from "@/shared/lib/paths";
import { IconArrowLeft, IconUser } from "@tabler/icons-react";
import { href, useNavigate } from "react-router-dom";

const mockUserId = "123";

export function Header() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(ROUTES.HOME);
  };

  const handleAccountClick = () => {
    navigate(href(ROUTES.USER, { userId: mockUserId }));
  };

  return (
    <header className="px-[18px] sm:px-[24px] py-[12px] sm:py-[16px]">
      <div className="mx-auto flex justify-between items-center">
        <Button
          className="cursor-pointer"
          variant="link"
          style={{ padding: 0 }}
          onClick={handleBackClick}
        >
          <IconArrowLeft /> назад
        </Button>

        <nav>
          <ul className="flex space-x-6">
            <li>
              <Button
                className="cursor-pointer"
                variant="link"
                style={{ padding: 0 }}
                onClick={handleAccountClick}
              >
                акаунт <IconUser />
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
