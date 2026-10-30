import { Link } from "react-router-dom";
import { useAtomValue } from "jotai";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import LazyLottie from "../common/LazyLottie";
import { Page } from "../common/Motion";
import { languageAtom } from "../../atoms/primitive.atom";
import { getCurrentLanguageText } from "../../utils/get-current-language-text";

const load404 = () => import("../../assets/animations/404.json");

export default function NotFound() {
  const language = useAtomValue(languageAtom);
  return (
    <Page className="container text-center py-5">
      <div className="mx-auto" style={{ maxWidth: 520 }}>
        <LazyLottie load={load404} placeholderHeight={360} />
      </div>
      <p className="page-lead mb-4">
        {getCurrentLanguageText(
          language,
          "This page wandered off. Let's get you back on track.",
          "页面走丢了，我们带你回到正轨。",
        )}
      </p>
      <Link to="/" className="btn-brand">
        <ArrowBackRoundedIcon fontSize="small" />
        {getCurrentLanguageText(language, "Back to home", "返回首页")}
      </Link>
    </Page>
  );
}
