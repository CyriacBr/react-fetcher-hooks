import React, { useState, useEffect } from "react";
import { useRequest, Fetcher, FetcherZone } from "react-fetcher-hooks";
import axios from "axios";

interface Picsum {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

interface PicsumListProps {
  picsums: Picsum[];
  onPicsumSelected: (p: Picsum) => void;
}

const PicsumList: React.FC<PicsumListProps> = ({
  picsums,
  onPicsumSelected
}) => {
  return (
    <div style={{ width: 300 }} className='items-list'>
      <FetcherZone
        onLoading
        options={{
          placeholder: { show: true },
          dimBackground: false,
          hideLoader: true
        }}
      >
        <span className="list-item --p">xxxxxxxxxxxx</span>
        <span className="list-item --p">xxxxxxxxxxxx</span>
        <span className="list-item --p">xxxxxxxxxxxx</span>
      </FetcherZone>
      <FetcherZone onLoaded>
        {picsums.map(p => (
          <div
            className="list-item"
            key={p.id}
            onClick={() => onPicsumSelected(p)}
          >
            Picsum #{p.id}
          </div>
        ))}
      </FetcherZone>
    </div>
  );
};

const PicsumDetail: React.FC<{ picsum: Picsum }> = ({ picsum }) => {
  return (
    <div className="my-content" style={{ width: 500 }}>
      <pre>
        <code>{JSON.stringify(picsum || "awaiting data", null, 2)}</code>
      </pre>
    </div>
  );
};

const ZonesExample = () => {
  const [ref, getPicsums, picsums] = useRequest(
    () => axios.get<Picsum[]>("https://picsum.photos/v2/list?page=1&limit=2"),
    true
  );
  const [picsum, setPicsum] = useState<Picsum>();
  // useEffect(() => ref.setLoading(true), []);

  function onPicsumSelected(picsum: Picsum) {
    setPicsum(picsum);
  }

  return (
    <div className="test-container">
      <Fetcher
        refs={[ref]}
        options={{
          hideLoader: true,
          progress: {
            show: true
          }
        }}
      >
        <span className="my-title">Picsum Loader</span>
        <div className="my-row-content">
          <PicsumList
            picsums={picsums || []}
            onPicsumSelected={onPicsumSelected}
          />
          <PicsumDetail picsum={picsum} />
        </div>
        <div className="my-footer">
          <a className="button is-primary" onClick={getPicsums}>
            Refresh
          </a>
        </div>
      </Fetcher>
    </div>
  );
};

export default ZonesExample;
