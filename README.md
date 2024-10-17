# GovernorHaus <img src="apps/web/public/logo-bg.svg" width="80" align="right"> 

GovernorHaus is an intuitive and user-friendly DAO launcher designed to simplify the creation of DAOs (Decentralized Autonomous Organizations) using OpenZeppelin Governor contracts. It is fully compatible with Tally.xyz, making DAO governance easy and accessible.

The platform features a straightforward form for setting essential DAO parameters, such as the DAO name, token name, token symbol, initial token holders, and voting settings. It guides users through each step, making it ideal even for those with limited technical expertise.

Built on Tally’s [gov_deployer](https://github.com/withtally/gov_deployer), which leverages OpenZeppelin contracts, GovernorHaus serves as a DAO factory that streamlines the creation and governance process. Unlike Tally’s CLI utility, which requires a technical setup for deployment, GovernorHaus allows users to visit the website, connect their wallet, fill out a simple form, and confirm the transaction directly in their wallet—no complex configurations or command-line usage needed.

Originally built during [ETHGlobal’s Superhack2024](https://ethglobal.com/showcase/governor-haus-anayc), we have since enhanced GovernorHaus with the following features:

- **Integration with Tally's frontend:** DAOs are automatically created and visible within Tally upon deployment.
- **Bulk import functionality:** Users can easily paste a list of addresses or ENS names with token allocations from a CSV, Excel, or Google Sheets document directly into the form, with fields being populated automatically.
- **Enhanced user interface:** We've improved the overall design and styling for a more polished experience.

Here you can see a demo on how to copy and paste from a Google Spreadsheet:
![](https://ipfs.blossom.software/ipfs/QmZWUTdXyYznJnegpsGbftqjQBoM7xZ8GPKvmJLqcv23Fu)

With [Governor.Haus](https://governor.haus) it's easier than ever create an OpenZeppelin / Tally DAO!