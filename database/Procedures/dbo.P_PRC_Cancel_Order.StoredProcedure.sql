USE [book-a-table]
GO
/****** Object:  StoredProcedure [dbo].[P_PRC_Cancel_Order]    Script Date: 7/10/2018 9:22:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[P_PRC_Cancel_Order]
@ORDER_ID BIGINT
AS
BEGIN

	DELETE FROM [dbo].[ORDER_ITEM]
	WHERE ORDER_ID = @ORDER_ID

	DELETE FROM [dbo].ORDERS
	WHERE ORDER_ID = @ORDER_ID

END
GO
