import React from 'react'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap'
import classnames from 'classnames'
import AccountInfoTab from './accountInfoTab'
import BankAccountTab from './bankAccountTab'
import CreditCardTab from './creditCardTab'
import NotificationsTab from './notificationsTab'

class AccountProfile extends React.Component {
	state = {
    activeTab: '1'
  }

	toggle = (tab) => {
		if (this.state.activeTab !== tab) {
			this.setState({ activeTab: tab })
		}
	}
	render() {
		return (
			<>
				<Nav tabs>
					<NavItem>
						<NavLink
							className={classnames({ active: this.state.activeTab === '1' })}
							onClick={() => { this.toggle('1') }}
						>
              My Account
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink
							className={classnames({ active: this.state.activeTab === '2' })}
							onClick={() => { this.toggle('2') }}
						>
              Notifications
						</NavLink>
					</NavItem>
          <NavItem>
						<NavLink
							className={classnames({ active: this.state.activeTab === '3' })}
							onClick={() => { this.toggle('3') }}
						>
              Credit Cards
						</NavLink>
					</NavItem>
          <NavItem>
						<NavLink
							className={classnames({ active: this.state.activeTab === '4' })}
							onClick={() => { this.toggle('4') }}
						>
              Banking
						</NavLink>
					</NavItem>
				</Nav>
				<TabContent activeTab={this.state.activeTab}>
					<TabPane tabId="1">
						<AccountInfoTab />
					</TabPane>
					<TabPane tabId="2">
            <NotificationsTab/>
					</TabPane>
          <TabPane tabId="3">
            {/*<CreditCardTab/>*/}
					</TabPane>
          <TabPane tabId="4">
            <BankAccountTab/>
					</TabPane>
				</TabContent>
			</>
		)
	}
}

export default AccountProfile
