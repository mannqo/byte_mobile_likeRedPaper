import { Article } from "../../PostDetail";
import TabPage from "../../TabPage";

export default function ArticleResult({ articles, loading }: { articles: Article[], loading: boolean }) {
    return <TabPage loading={loading} articles={articles} hasMore={false} loadMore={() => { }} />
}