export interface TopicNode {
  [key: string]: TopicNode | null;
}

export type TopicsNode = Array<TopicNode>;
