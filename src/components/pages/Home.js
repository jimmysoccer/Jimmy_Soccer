import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Projects from "./Projects";
import WorkingExperience from "./Works";
import web_development_animation from "../../assets/animations/web_development.json";
import Lottie from "lottie-react";
import { Grid } from "@mui/material";
import { useAtomValue } from "jotai";
import { languageAtom } from "../../atoms/primitive.atom";
import { getCurrentLanguageText } from "../../utils/get-current-language-text";
import { NAV_BAR } from "../../constants/navbar-items";
import { motion } from "framer-motion";
import Publications from "./Publications";

export default function Home() {
  const language = useAtomValue(languageAtom);

  const TEXT_1 = getCurrentLanguageText(
    language,
    `🚀 Hi, I'm Heng Sun, a Ph.D. student in Computer Science at Emory University.`,
    `🚀 你好，我是孙恒，埃默里大学计算机科学专业博士生。`,
  ).split(" ");

  const TEXT_2 = getCurrentLanguageText(
    language,
    `I build end-to-end AI systems that combine modern full-stack engineering with machine learning to solve real-world healthcare challenges. My goal is to bridge cutting-edge AI research with scalable software that can make a meaningful impact in clinical practice.`,
    `我构建端到端的AI系统，结合现代全栈工程和机器学习，解决现实世界的医疗挑战。我的目标是将前沿的AI研究与可扩展的软件相结合，为临床实践带来实际意义。`,
  ).split(" ");

  const TEXT_3 = getCurrentLanguageText(
    language,
    `Current Interests: Machine Learning • Foundation Models • Clinical AI • Full-Stack Engineering • Intelligent Healthcare Systems`,
    `当前兴趣: 机器学习 • 基础模型 • 临床AI • 全栈工程 • 智能医疗系统`,
  ).split(" ");

  return (
    <motion.div
      className="container"
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Grid container className="my-5 px-3" justifyContent={"center"} gap={5}>
        <Grid item md={4}>
          <h2 className="text-center fw-bold">
            {getCurrentLanguageText(
              language,
              "AI Researcher & Full-Stack Engineer",
              "人工智能研究员 & 全栈工程师",
            )}
          </h2>
          <p className="fs-5 text-secondary">
            {TEXT_1.map((el, i) => (
              <motion.span
                className="fs-5 text-secondary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: i / 10 }}
              >
                {el}{" "}
              </motion.span>
            ))}
          </p>
          <p className="fs-5 text-secondary">
            {TEXT_2.map((el, i) => (
              <motion.span
                className="fs-5 text-secondary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: i / 10 }}
              >
                {el}{" "}
              </motion.span>
            ))}
          </p>
          <p className="fs-5 text-secondary">
            {TEXT_3.map((el, i) => (
              <motion.span
                className="fs-5 text-secondary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: i / 10 }}
              >
                {el}{" "}
              </motion.span>
            ))}
          </p>
        </Grid>
        <Grid item md={4}>
          <div className="mx-2">
            <Lottie
              className="img-fluid"
              animationData={web_development_animation}
            ></Lottie>
          </div>
        </Grid>
      </Grid>

      <div className="d-flex justify-content-center mb-5 mt-2">
        <GitHubIcon
          className="mx-3"
          role="button"
          color="action"
          fontSize="large"
          onClick={() => window.open("https://github.com/jimmysoccer")}
        ></GitHubIcon>
        <EmailIcon
          className="mx-3"
          role="button"
          fontSize="large"
          onClick={() => window.open("mailto:jimmysoccer0927@gmail.com")}
        ></EmailIcon>
        <LinkedInIcon
          className="mx-3"
          role="button"
          fontSize="large"
          onClick={() =>
            window.open("https://www.linkedin.com/in/jimmysoccer/")
          }
        ></LinkedInIcon>
      </div>
      <h2 className="text-center my-5">
        {getCurrentLanguageText(
          language,
          NAV_BAR.workingExperience.title,
          NAV_BAR.workingExperience.titleChinese,
        )}
      </h2>
      <WorkingExperience hideHeader={true} />
      <h2 className="text-center my-5">
        {getCurrentLanguageText(
          language,
          NAV_BAR.projects.title,
          NAV_BAR.projects.titleChinese,
        )}
      </h2>
      <Projects hideHeader={true}></Projects>
      <h2 className="text-center my-5">
        {getCurrentLanguageText(
          language,
          NAV_BAR.publications.title,
          NAV_BAR.publications.titleChinese,
        )}
      </h2>
      <Publications hideHeader={true}></Publications>
    </motion.div>
  );
}
