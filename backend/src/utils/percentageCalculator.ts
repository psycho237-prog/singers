/**
 * Calculate percentage for each nominee based on votes
 * Percentage = (nominee votes / total votes in category) * 100
 */

interface NomineeData {
    category_id?: string | number;
    categoryId?: string | number;
    votes: string | number;
}

export function calculatePercentages<T extends NomineeData>(nominees: T[]): (T & { percentage: number; totalVotesInCategory: number })[] {
    if (!nominees || nominees.length === 0) return [];

    const categoriesMap = new Map<string, T[]>();

    nominees.forEach((nominee) => {
        const categoryId = String(nominee?.category_id || nominee?.categoryId || 'unknown');
        if (!categoriesMap.has(categoryId)) {
            categoriesMap.set(categoryId, []);
        }
        categoriesMap.get(categoryId)!.push(nominee);
    });

    const result = nominees.map((nominee) => {
        const categoryId = String(nominee?.category_id || nominee?.categoryId || 'unknown');
        const categoryGroup = categoriesMap.get(categoryId) || [];

        const totalVotesInCategory = categoryGroup.reduce((sum, n) => sum + (parseInt(String(n.votes)) || 0), 0);

        const currentVotes = parseInt(String(nominee.votes)) || 0;
        const percentage = totalVotesInCategory > 0
            ? Math.round((currentVotes / totalVotesInCategory) * 100)
            : 0;

        return {
            ...nominee,
            percentage,
            totalVotesInCategory
        };
    });

    return result;
}
