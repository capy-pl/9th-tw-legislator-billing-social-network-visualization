import React from 'react';

import { Legislator } from '../../interface';

import './LegislatorInfoTab.css';
import { base64Url } from '../../util';

type Props = {
  legislator: Legislator;
  close: () => void;
}

const LegislatorInfoTab = (props: Props) => (
      <div id='legislator-info-tab' className='card'>
        <button type="button" className="close" aria-label="Close" onClick={props.close}>
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="card-header">
            <h3>
              立委個人資訊
            </h3>
          </div>
          <div className='card-body'>
            <img src={base64Url(props.legislator.picBase64)} alt='立委頭像' className='rounded' />
            <h4 style={{ display: 'inline-block' }}>{props.legislator.name} ({props.legislator.party})</h4>
            <div className='list-group'>
              <div className='list-group-item'>
                <h5>委員會經歷</h5>
                {props.legislator.committee.join(' ; ')}
              </div>
              <div className='list-group-item'>
                <h5>選區</h5>
                {props.legislator.areaName}
              </div>
              <div className='list-group-item'>
                <h5>學歷</h5>
                {props.legislator.degree.join(' ; ')}
              </div>
              <div className='list-group-item'>
                <h5>經歷</h5>
                {props.legislator.experience.join(' ; ')}
              </div>
            </div>
          </div>
      </div>
);

export default LegislatorInfoTab;