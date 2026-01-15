import clustering from "density-clustering";

export function clusterIssues(points) {
  const dbscan = new clustering.DBSCAN();
  return dbscan.run(points, 0.01, 3);
}
