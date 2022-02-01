import { Article } from "../../PostDetail";
import TabPage from "../../TabPage";

export default function ArticleResult({ articles }: { articles: Article[] }) {
    return <TabPage articles={articles} hasMore={false} loadMore={() => { }} />
}